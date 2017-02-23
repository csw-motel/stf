var syrup = require('stf-syrup')

var browsers = require('stf-browser-db')

var logger = require('../../../util/logger')
var wire = require('../../../wire')
var wireutil = require('../../../wire/util')

var mapping = (function() {
  var list = Object.create(null)
  Object.keys(browsers).forEach(function(id) {
    var browser = browsers[id]
    if (browser.platforms.android) {
      list[browser.platforms.android.package] = id
    }
  })
  return list
})()

module.exports = syrup.serial()
  .dependency(require('../../device/support/router'))
  .dependency(require('../../device/support/push'))
  .define(function(options, router, push) {
    var log = logger.createLogger('device:plugins:browser')

    function updateBrowsers() {
      log.info('Updating browser list')
      push.send([
        wireutil.global
      , wireutil.envelope(new wire.DeviceBrowserMessage({
        serial: options.serial,
        selected: true,
        apps:[
          {
            id: 'Safari',
            name: 'Safari',
            selected: true,
            system: true,
            type: 'safari'
          }
          ]
        }))
      ])
    }



    return updateBrowsers()
  })
