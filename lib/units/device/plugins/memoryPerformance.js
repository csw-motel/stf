var syrup = require('stf-syrup')
var Promise = require('bluebird')

var logger = require('../../../util/logger')
var wire = require('../../../wire')
var wireutil = require('../../../wire/util')
var lifecycle = require('../../../util/lifecycle')
var dbapi = require('../../../db/api')
var datautil = require('../../../util/datautil')
  //var adbkit = require('../../../../../adbkit')

module.exports = syrup.serial()
  .dependency(require('../support/adb'))
  .dependency(require('../support/router'))
  .dependency(require('../support/push'))
  .dependency(require('./group'))
  .define(function(options, adb, router, push, group) {
    var log = logger.createLogger('device:plugins:performance')
    var plugin = Object.create(null)
    var activePerformance = null

    plugin.start = function() {
      return group.get()
        .then(function(group) {
          return plugin.stop()
            .then(function() {
              log.info('Starting memory performance: ' + options.serial)
              return adb.openMemStat(options.serial)
            })
            .timeout(10000)
            .then(function(stats) {
              activePerformance = stats
              var dev
              dbapi.loadDevice(options.serial)
                .then(function(device) {
                  dev = device
                })

              function loadListener(load) {
                var loadMemory = []
                var memoryTotal, memoryFree
                memoryTotal = new wire.LoadMemory('MemTotal', load.MemTotal)
                memoryFree = new wire.LoadMemory('MemUsed', load.MemFree)

                loadMemory.push(memoryTotal)
                loadMemory.push(memoryFree)

                push.send([
                  dev.channel, wireutil.envelope(new wire.DeviceMemoryPerformanceMessage(
                    options.serial, Math.floor(Date.now() /
                      1000),
                    loadMemory))
                ])
              }

              stats.on('load', loadListener)
            })
        })
    }

    plugin.stop = Promise.method(function() {
      if (plugin.isRunning()) {
        log.info('Stopping performance')
        activePerformance.end()
        activePerformance = null
      }
    })

    plugin.isRunning = function() {
      return !!activePerformance
    }

    lifecycle.observe(plugin.stop)
    group.on('leave', plugin.stop)

    router
      .on(wire.PerformanceStartMessage, function(channel, message) {
        var reply = wireutil.reply(options.serial)
        plugin.start()
          .then(function() {
            push.send([
              channel, reply.okay('success')
            ])
          })
          .catch(function(err) {
            log.error('Unable to open performance', err.stack)
            push.send([
              channel, reply.fail('fail')
            ])
          })
      })
      .on(wire.PerformanceStopMessage, function(channel) {
        var reply = wireutil.reply(options.serial)
        plugin.stop()
          .then(function() {
            push.send([
              channel, reply.okay('success')
            ])
          })
          .catch(function(err) {
            log.error('Failed to stop performance', err.stack)
            push.send([
              channel, reply.fail('fail')
            ])
          })
      })

    return plugin
  })
