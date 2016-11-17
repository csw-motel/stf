var syrup = require('stf-syrup')
var Promise = require('bluebird')

var logger = require('../../../util/logger')
var wire = require('../../../wire')
var wireutil = require('../../../wire/util')
var lifecycle = require('../../../util/lifecycle')

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
              log.info('Starting performance: ' + options.serial)
              return adb.openProcStat(options.serial)
            })
            .timeout(10000)
            .then(function(stats) {
              activePerformance = stats

              function loadListener(load) {
                var loadCpus = []

                for (var key in Object.keys(load)) {
                  var cpu = Object.keys(load)[key]
                  var value = load[cpu].user + load[cpu].system
                  var loadCpu = new wire.Load(key, value)
                  loadCpus.push(loadCpu)
                }

                push.send([
                  group.group, wireutil.envelope(new wire.DevicePerformanceMessage(
                    options.serial, Math.floor(Date.now() / 1000),
                    loadCpus))
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
