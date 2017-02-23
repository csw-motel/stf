var syrup = require('stf-syrup')

var logger = require('../../util/logger')
var lifecycle = require('../../util/lifecycle')

module.exports = function(options) {
  // Show serial number in logs
  logger.setGlobalIdentifier(options.serial)

  var log = logger.createLogger('device-ios')

  return syrup.serial()
    // We want to send logs before anything else starts happening
    .dependency(require('../device/plugins/logger'))
    .define(function(options) {
      var log = logger.createLogger('device-ios')
      log.info('Preparing device')
      return syrup.serial()
        .dependency(require('../device/plugins/heartbeat'))
        .dependency(require('./plugins/solo'))
        .dependency(require('./plugins/reboot'))
        .dependency(require('./plugins/browser'))
        .dependency(require('./plugins/group'))
        .define(function(options, heartbeat, solo) {
          if (process.send) {
            // Only if we have a parent process
            process.send('ready')
          }
          log.info('Fully operational')
          return solo.poke()
        })
        .consume(options)
    })
    .consume(options)
    .catch(function(err) {
      log.fatal('Setup had an error', err.stack)
      lifecycle.fatal()
    })
}
