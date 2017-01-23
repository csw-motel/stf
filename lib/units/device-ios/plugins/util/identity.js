var syrup = require('stf-syrup')
var devicesdb =  require('stf-device-db')
var devutil = require('../../../../util/devutil')
var logger = require('../../../../util/logger')


module.exports = syrup.serial()
  .define(function(options) {
    var log = logger.createLogger('device:plugins:identity')

    function solve() {
      log.info('Solving identity')
      var identity = devutil.makeIdentityIOS(options.serial)
      var data =  devicesdb.find({'model': identity.model})
      if(!data){
        data = {
          display:{
            h: 1,
            s: 4.5,
            w: 1
          }
        }
      }

      identity.display = {
        density: 0,
        fps: 1.0,
        height: data.display.h,
        id: 0,
        rotation: 0,
        secure: true,
        size: data.display.s,
        url: 'ws://localhost:7400',
        width: data.display.w,
        xdpi: 1.0,
        ydpi: 1.0
      };
      identity.phone = {
        iccid: null,
        imei: devutil.getImeiIOS(options.serial),
        network: null,
        phoneNumber: null
      };
      return identity
    }

    return solve()
  })

