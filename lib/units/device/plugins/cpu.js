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
    var log = logger.createLogger('device:plugins:cpu')
    var plugin = Object.create(null)


    plugin.start = function() {
      log.info('CPU')
      return adb.openProcStat(options.serial)
        .then(function cpu(entry) {
          push.send([
            group.group, wireutil.envelope(new wire.DeviceCpuData(
              options.serial, entry.date.getTime() / 1000,
              entry.pid, entry.tid, entry.priority, entry.tag,
              entry.message
            ))
          ])
        })
    }

    plugin.stop = Promise.method(function() {

    })


    router
      .on(wire.DeviceCpuData, function(channel, message) {
        var reply = wireutil.reply(options.serial)
        plugin.start(message.filters)
          .then(function() {
            push.send([
              channel, reply.okay('success')
            ])
          })
          .catch(function(err) {
            log.error('Unable to open logcat', err.stack)
            push.send([
              channel, reply.fail('fail')
            ])
          })
      })
      .on(wire.LogcatStopMessage, function(channel) {
        var reply = wireutil.reply(options.serial)
        plugin.stop()
          .then(function() {
            push.send([
              channel, reply.okay('success')
            ])
          })
          .catch(function(err) {
            log.error('Failed to stop logcat', err.stack)
            push.send([
              channel, reply.fail('fail')
            ])
          })
      })

    return plugin
  })
