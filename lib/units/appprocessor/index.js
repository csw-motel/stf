var logger = require('../../util/logger')
var zmqutil = require('../../util/zmqutil')
var srv = require('../../util/srv')
var lifecycle = require('../../util/lifecycle')
var wireutil = require('../../wire/util')
var wirerouter = require('../../wire/router')
var events = require('events')
var wire = require('../../wire')
var dbapi = require('../../db/api')
var Promise = require('bluebird')
var datautil = require('../../util/datautil')
var deviceutil = require('../../util/deviceutil')

module.exports = function(options) {
  var log = logger.createLogger('appprocessor')
  var channelRouter = new events.EventEmitter()

  var push = zmqutil.socket('push')
  Promise.map(options.endpoints.push, function(endpoint) {
    return srv.resolve(endpoint).then(function(records) {
      return srv.attempt(records, function(record) {
        log.info('Sending output to "%s"', record.url)
        push.connect(record.url)
        return Promise.resolve(true)
      })
    })
  })
    .catch(function(err) {
      log.fatal('Unable to connect to push endpoint', err)
      lifecycle.fatal()
    })

  // Input
  var sub = zmqutil.socket('sub')
  Promise.map(options.endpoints.sub, function(endpoint) {
    return srv.resolve(endpoint).then(function(records) {
      return srv.attempt(records, function(record) {
        log.info('Receiving input from "%s"', record.url)
        sub.connect(record.url)
        return Promise.resolve(true)
      })
    })
  })
    .catch(function(err) {
      log.fatal('Unable to connect to sub endpoint', err)
      lifecycle.fatal()
    })

  // Establish always-on channels
  ;
  [wireutil.global].forEach(function(channel) {
    log.info('Subscribing to permanent channel "%s"', channel)
    sub.subscribe(channel)
  })

  sub.on('message', function(channel, data) {
    channelRouter.emit(channel.toString(), channel, data)
  })


  channelRouter.on(wireutil.global, wirerouter()
    .on(wire.AddDeviceToUserMessage, function(channel, message, data) {
      dbapi.loadAccessToken(message.token)
        .then(function(token) {
          if (!token) {
            push.send(wireutil.global,
              wireutil.envelope(
                new wire.UserDeviceResponseMessage(
                  message.token, message.serial, false, 'Token not found'
                )
              )
            )
          }
          else {
            if (!data) {
              push.send([
                channel, wireutil.envelope(
                  new wire.UserDeviceResponseMessage(
                    message.token, message.serial, false, 'No data'
                  )
                )
              ])
            }
            dbapi.loadUser(token.email)
              .then(function(user) {
                if (user) {
                  dbapi.loadDevice(message.serial)
                    .then(function(device) {
                      if (!device) {
                        push.send([
                          channel, wireutil.envelope(
                            new wire.UserDeviceResponseMessage(
                              message.token, message.serial, false, 'Device not found'
                            )
                          )
                        ])
                      }
                      else {
                        datautil.normalize(device, user)
                        if (!deviceutil.isAddable(device, user)) {
                          push.send([
                            channel, wireutil.envelope(
                              new wire.UserDeviceResponseMessage(
                                message.token, message.serial, false,
                                'Device is being used or not available'
                              )
                            )
                          ])
                          return
                        }

                        var responseTimer = setTimeout(function() {
                          channelRouter.removeListener(wireutil.global, messageListener)
                          push.send([
                            channel, wireutil.envelope(
                              new wire.UserDeviceResponseMessage(
                                message.token, message.serial, false, 'Device is not responding'
                              )
                            )
                          ])
                        }, 5000)

                        var messageListener = wirerouter()
                          .on(wire.JoinGroupMessage, function(channel, message) {
                            log.info('Chegou aqui , serial : ' + message.serial +
                              ' email: ' + user.email + ', channel: ' + channel)
                            if (message.serial === device.serial &&
                              message.owner.email === user.email) {
                              channelRouter.removeListener(wireutil.global, messageListener)
                              clearTimeout(responseTimer)
                              push.send([
                                channel, wireutil.envelope(
                                  new wire.UserDeviceResponseMessage(
                                    token.id, message.serial,
                                    true, 'Device successfully added'
                                  )
                                )
                              ])
                            }
                          }).handler()

                        channelRouter.on(wireutil.global, messageListener)

                        push.send([
                          device.channel, wireutil.envelope(
                            new wire.GroupMessage(
                              new wire.OwnerMessage(
                                user.email, user.name, user.group
                              ), null, wireutil.toDeviceRequirements({
                                serial: {
                                  value: message.serial,
                                  match: 'exact'
                                }
                              })
                            )
                          )
                        ])
                      }
                    })
                    .catch(function(err) {
                      log.error('Failed to load device "%s": ', err.stack)
                      push.send([
                        channel, wireutil.envelope(
                          new wire.UserDeviceResponseMessage(
                            message.token, message.serial, false, 'Failed to load device "%s": '
                          )
                        )
                      ])
                    })
                }
                else {
                  push.send([
                    channel, wireutil.envelope(
                      new wire.UserDeviceResponseMessage(
                        message.token, message.serial, false, 'This user do not exist'
                      )
                    )
                  ])
                }
              })
              .catch(function(err) {
                log.error('Failed to load user: ', err.stack)
                push.send([
                  channel, wireutil.envelope(
                    new wire.UserDeviceResponseMessage(
                      message.token, message.serial, false, 'Failed to load user: '
                    )
                  )
                ])
              })
          }
        })
    })
    .on(wire.DeleteDeviceFromUserMessage, function(channel, message, data) {
      dbapi.loadAccessToken(message.token)
        .then(function(token) {
          if (!token) {
            push.send(wireutil.global,
              wireutil.envelope(
                new wire.UserDeviceResponseMessage(
                  message.token, message.serial, false, 'Token not found'
                )
              )
            )
          }
          else {
            if (!data) {
              push.send([
                channel, wireutil.envelope(
                  new wire.UserDeviceResponseMessage(
                    message.token, message.serial, false, 'No data'
                  )
                )
              ])
            }
            dbapi.loadUser(token.email)
              .then(function(user) {
                if (user) {
                  dbapi.loadDevice(message.serial)
                    .then(function(device) {
                      if (!device) {
                        push.send([
                          channel, wireutil.envelope(
                            new wire.UserDeviceResponseMessage(
                              message.token, message.serial, false, 'Device not found'
                            )
                          )
                        ])
                      }
                      else {
                        datautil.normalize(device, user)
                        if (!deviceutil.isOwnedByUser(device, user)) {
                          push.send([
                            channel, wireutil.envelope(
                              new wire.UserDeviceResponseMessage(
                                message.token, message.serial, false,
                                'You cannot release this device. Not owned by you or not in use'
                              )
                            )
                          ])
                          return
                        }

                        var responseTimer = setTimeout(function() {
                          channelRouter.removeListener(wireutil.global,
                            messageListenerDelete)
                          push.send([
                            channel, wireutil.envelope(
                              new wire.UserDeviceResponseMessage(
                                message.token, message.serial, false, 'Device is not responding'
                              )
                            )
                          ])
                        }, 5000)

                        var messageListenerDelete = wirerouter()
                          .on(wire.LeaveGroupMessage, function(channel, message) {
                            if (message.serial === device.serial &&
                              message.owner.email === user.email) {
                              channelRouter.removeListener(wireutil.global,
                                messageListenerDelete)
                              clearTimeout(responseTimer)
                              push.send([
                                channel, wireutil.envelope(
                                  new wire.UserDeviceResponseMessage(
                                    token.id, message.serial,
                                    true, 'Device successfully removed'
                                  )
                                )
                              ])
                            }
                          })
                          .handler()

                        channelRouter.on(wireutil.global, messageListenerDelete)

                        push.send([
                          device.channel, wireutil.envelope(
                            new wire.UngroupMessage(
                              wireutil.toDeviceRequirements({
                                serial: {
                                  value: message.serial,
                                  match: 'exact'
                                }
                              })
                            )
                          )
                        ])
                      }
                    })
                    .catch(function(err) {
                      log.error('Failed to load device "%s": ', err.stack)
                      push.send([
                        channel, wireutil.envelope(
                          new wire.UserDeviceResponseMessage(
                            token.id, message.serial, false, 'Failed to load device "%s": '
                          )
                        )
                      ])
                    })
                }
                else {
                  push.send([
                    channel, wireutil.envelope(
                      new wire.UserDeviceResponseMessage(
                        message.token, message.serial, false, 'This user do not exist'
                      )
                    )
                  ])
                }
              })
              .catch(function(err) {
                log.error('Failed to load user: ', err.stack)
                push.send([
                  channel, wireutil.envelope(
                    new wire.UserDeviceResponseMessage(
                      message.token, message.serial, false, 'Failed to load user: '
                    )
                  )
                ])
              })
          }
        })
    }).handler()
  )
}
