// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};


var App = {};
App.log = require('log');
App.Kanka = require('com.ewin.kanka.bluetooth');
App.Bluetooth = require('com.ewin.kanka.bluetooth');
	if(OS_ANDROID) {
	Ti.Android.currentActivity.addEventListener('create', function(e) {
		App.log('Root create');
	});
	Ti.Android.currentActivity.addEventListener('start', function(e) {
		App.log('Root start');
	});
	Ti.Android.currentActivity.addEventListener('resume', function(e) {
		App.log('Root resume');
	});
	Ti.Android.currentActivity.addEventListener('pause', function(e) {
		App.log('Root pause');
	});
	Ti.Android.currentActivity.addEventListener('stop', function(e) {
		App.log('Root stop');
	});
	Ti.Android.currentActivity.addEventListener('destroy', function(e) {
		App.log('Root destroy');
	});
	Ti.Android.currentActivity.addEventListener('restart', function(e) {
		App.log('Root restart');
	});
}