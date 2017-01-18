var syrup = require('stf-syrup')

var devutil = require('../../../../util/devutil')
var logger = require('../../../../util/logger')

module.exports = syrup.serial()
  .define(function(options) {
    var log = logger.createLogger('device:plugins:identity')

    function solve() {
      log.info('Solving identity')
      var identity = devutil.makeIdentityIOS(options.serial)
      identity.display = {
        density: 3,
        fps: 59.880001068115234,
        height: 1920,
        id: 0,
        rotation: 0,
        secure: true,
        size: 5.464510440826416,
        url: 'ws://localhost:7400',
        width: 1080,
        xdpi: 403.4110107421875,
        ydpi: 403.0409851074219
      };
      identity.phone = {
        iccid: 'imei',
        imei: 'imei',
        network: 'LTE',
        phoneNumber: null
      };
      return identity
    }

    return solve()
  })
