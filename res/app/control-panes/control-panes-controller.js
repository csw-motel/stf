module.exports =
  function ControlPanesController($scope, $http, gettext, $routeParams,
    $timeout, $location, DeviceService, GroupService, ControlService,
    StorageService, FatalMessageService, SettingsService, PerformanceService) {

    var sharedTabs = [{
      title: gettext('Screenshots'),
      icon: 'fa-camera color-skyblue',
      templateUrl: 'control-panes/screenshots/screenshots.pug',
      filters: ['native', 'web']
    }, {
      title: gettext('Automation'),
      icon: 'fa-road color-lila',
      templateUrl: 'control-panes/automation/automation.pug',
      filters: ['native', 'web']
    }, {
      title: gettext('Advanced'),
      icon: 'fa-bolt color-brown',
      templateUrl: 'control-panes/advanced/advanced.pug',
      filters: ['native', 'web']
    }, {
      title: gettext('File Explorer'),
      icon: 'fa-folder-open color-blue',
      templateUrl: 'control-panes/explorer/explorer.pug',
      filters: ['native', 'web']
    }, {
      title: gettext('Info'),
      icon: 'fa-info color-orange',
      templateUrl: 'control-panes/info/info.pug',
      filters: ['native', 'web']
    }]

    $scope.topTabs = [{
      title: gettext('Dashboard'),
      icon: 'fa-dashboard fa-fw color-pink',
      templateUrl: 'control-panes/dashboard/dashboard.pug',
      filters: ['native', 'web']
    }].concat(angular.copy(sharedTabs)).concat([{
      title: gettext('Performance'),
      icon: 'fa-info color-orange',
      templateUrl: 'control-panes/performance/performance.pug',
      filters: ['native', 'web']
    }])

    $scope.belowTabs = [{
      title: gettext('Logs'),
      icon: 'fa-list-alt color-red',
      templateUrl: 'control-panes/logs/logs.pug',
      filters: ['native', 'web']
    }].concat(angular.copy(sharedTabs))

    $scope.device = null
    $scope.control = null

    // TODO: Move this out to Ctrl.resolve
    function getDevice(serial) {
      DeviceService.get(serial, $scope)
        .then(function(device) {
          return GroupService.invite(device)
        })
        .then(function(device) {
          //PerformanceService.startPerformance()

          $scope.device = device
          $scope.control = ControlService.create(device, device.channel)
          $scope.control.startPerformance()
            // TODO: Change title, flickers too much on Chrome
            // $rootScope.pageTitle = device.name

          SettingsService.set('lastUsedDevice', serial)

          return device
        })
        .catch(function() {
          $timeout(function() {
            $location.path('/')
          })
        })
    }

    getDevice($routeParams.serial)

    $scope.$watch('device.state', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (oldValue === 'using') {
          FatalMessageService.open($scope.device, false)
        }
      }
    }, true)

  }
