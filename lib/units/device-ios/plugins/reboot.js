var syrup = require('stf-syrup')

var logger = require('../../../util/logger')
var wire = require('../../../wire')
var wireutil = require('../../../wire/util')
var ioskit =  require('../../provider-ios/ios.js')

module.exports = syrup.serial()
  .dependency(require('../support/router'))
  .dependency(require('../support/push'))
  .define(function(options, router, push) {
    var log = logger.createLogger('device:plugins:reboot')
    log.info('Reboot plugin waiting')
    router.on(wire.RebootMessage, function(channel) {
      var reply = wireutil.reply(options.serial)

      log.important('Rebooting')
      if ( ioskit.restartIOS(options.serial)) {
        //required a sleep in this place for 30000 sc
        log.info('Device is Rebooting')
         push.send([
            channel
          , reply.okay()
          ])
      } else {
        log.error('Reboot failed', err.stack)
          push.send([
            channel
          , reply.fail(err.message)
          ])
      }
    })
  })
