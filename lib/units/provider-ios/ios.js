var usbDetect = require('usb-detection');
var events = require('events');
var exe = require('child_process').exec;
var deasync = require('deasync');
var exec = deasync(exe);

// This var will be singleton to not create multiple instances of events emitter
var sendEvents = null;

function getInstance() {
	if(sendEvents === null) {
		sendEvents = new events();
	}
	return sendEvents;
}

function checkIOS(device) {
	if(device.deviceName.toLowerCase().indexOf('iphone') !== -1 ||
	device.deviceName.toLowerCase().indexOf('ipad') !== -1) {
		return device;
	}
	return false;
}

function trackDevices() {
	usbDetect.find(function(err, devices) {
		var i;
		for(i = 0; i < devices.length; i += 1) {
			if(checkIOS(devices[i]) !== false) {
				// this is to get the devices already connected
				sendEvents.emit('add', checkIOS(devices[i]));
			}
		}		
	});

	usbDetect.on('add', function(device) {
		if(checkIOS(device) !== false) {
			sendEvents.emit('add', checkIOS(device));
		}
	});

	usbDetect.on('change', function(device) {
		if(checkIOS(device) !== false) {
			sendEvents.emit('change', checkIOS(device));
		}
	});

	usbDetect.on('remove', function(device) {
		if(checkIOS(device) !== false) {
			sendEvents.emit('remove', checkIOS(device));
		}
	});

}


function stopTraking() {
	usbDetect.stopMonitoring();
}


function getDeviceName(id) {
  return exec('idevicename -u ' + id).replace(/\n/gi,'');
}

function getDeviceVersion(id) {
  return exec('ideviceinfo -u ' + id + ' |grep ProductVersion').replace(/ProductVersion:\s/gi,'').replace(/\s/gi,'');
}

function getDeviceImei(id) {
  return exec('ideviceinfo -u '+ id + ' |grep -w SerialNumber').replace(/SerialNumber:\s/gi,'').replace(/\s/gi,'');
}

function getDeviceArchiteture(id) {
  return exec('ideviceinfo -u ' + id + ' |grep -w CPUArchitecture').replace(/CPUArchitecture:\s/gi,'').replace(/\s/gi,'');
}

function getDeviceBuildVersion(id) {
  return exec('ideviceinfo -u ' + id + ' |grep -w BuildVersion').replace(/BuildVersion:\s/gi,'').replace(/\s/gi,'');
}

function getDeviceModelNumber(id) {
  return exec('ideviceinfo -u ' + id + ' |grep -w ModelNumber').replace(/ModelNumber:\s/gi,'').replace(/\s/gi,'');
}

function getDeviceClass(id) {
	return exec('ideviceinfo -u ' + id + ' |grep -w DeviceClass').replace(/DeviceClass:\s/gi,'').replace(/\s/gi,'');
}

function restartIOS(id) {
	var value = false;
	var result = exec('idevicediagnostics restart -u ' + id).replace(/\n/gi,'');
	if( result === 'Restarting device.') {
		value = true;
	}
	return value;
}

function shutdownIOS(id) {
	var value = false;
	var result = exec('idevicediagnostics shutdown -u ' + id).replace(/\n/gi,'');
	if( result === 'Shutting down device.') {
		value = true;
	}
	return value;
}

function makeIdentityIOS(id) {
	var identity = {
		serial:id
	  , platform: 'ios'
	  , manufacturer: 'Apple'
	  , operator: null
	  , model: getDeviceName(id)
	  , version: getDeviceVersion(id)
	  , abi: getDeviceArchiteture(id)
	  , sdk: getDeviceBuildVersion(id)
	  , product: getDeviceName(id)
	};
	return identity;
}

function getAllAppsIOS(id) {
	var apps = {};
	var tmp = null;
	var i = 1;
	var result = exec('ideviceinstaller -u ' + id + ' -l -o list_all');
	result = result.split('\n');
	for(i = 1 ; i < result.length; i += 1 ) {
		tmp = result[i].replace(/\n/gi,'');
		tmp = tmp.split(' - ');
		if(tmp[0] !== ''){
			apps[tmp[0]] = tmp[1];
		}	
	}
	return apps;
}

function getSystemAppsIOS(id) {
	var apps = {};
	var result = exec('ideviceinstaller -u ' + id + ' -l -o list_system');
	result = result.split('\n');
	for(i = 1 ; i < result.length; i += 1 ) {
		tmp = result[i].replace(/\n/gi,'');
		tmp = tmp.split(' - ');
		if(tmp[0] !== ''){
			apps[tmp[0]] = tmp[1];
		}	
	}
	return apps;
}

function getUserAppsIOS(id) {
	var apps = {};
	var result = exec('ideviceinstaller -u ' + id + ' -l -o list_user');
	result = result.split('\n');
	for(i = 1 ; i < result.length; i += 1 ) {
		tmp = result[i].replace(/\n/gi,'');
		tmp = tmp.split(' - ');
		if(tmp[0] !== ''){
			apps[tmp[0]] = tmp[1];
		}	
	}
	return apps;
}

module.exports.getAllAppsIOS = getAllAppsIOS;
module.exports.getUserAppsIOS = getUserAppsIOS;
module.exports.getSystemAppsIOS = getSystemAppsIOS;
module.exports.restartIOS = restartIOS;
module.exports.shutdownIOS = shutdownIOS;
module.exports.getInstance = getInstance;
module.exports.trackDevices = trackDevices;
module.exports.stopTraking = stopTraking;
module.exports.getDeviceName = getDeviceName;
module.exports.getDeviceVersion = getDeviceVersion;
module.exports.getDeviceImei = getDeviceImei;
module.exports.getDeviceArchiteture = getDeviceArchiteture;
module.exports.getDeviceBuildVersion = getDeviceBuildVersion;
module.exports.getDeviceModelNumber = getDeviceModelNumber;
module.exports.getDeviceClass = getDeviceClass;
module.exports.makeIdentityIOS = makeIdentityIOS;