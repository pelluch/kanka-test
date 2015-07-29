

$.getView().open();
var rows = {};
var counter = 0;

if(OS_IOS) {
	Alloy.Globals.NavigationWindow = $.getView();
}

var interval = null;
var temp;
App.log('Test');
App.Bluetooth.test = false;

App.Bluetooth.startScan({
	onDiscover: function(device) {
		
		App.log('Discovered ', device);
		if(!rows[device.uniqueId]) {
			var row = Alloy.createController('device_row', {
				device: device
			});
			rows[device.uniqueId] = row;
			$.scrollView.add(row.getView());
		} else {
			rows[device.uniqueId].update(device);
		}
		/*bluetooth.connectDevice(device.uniqueId, function(e) {
			temp = Math.round((e.temperature-32)/1.8);
			if(!interval) {
				interval = setInterval(function() {
					$.label.setText(temp);
					Ti.API.info(JSON.stringify(e));
					$.webview.evalJS('addPoint("' + counter + '", ' + temp + ')');
					counter+=5;
				}, 5000);
			}
		});
		*/
	},
	onUndiscover: function(device) {
		App.log('Undiscovered ', device);
		if(rows[device.uniqueId]) {
			rows[device.uniqueId].update(device);
		}
	}
});

function onOpen(e) {
	if(OS_ANDROID) {
		var activity = this.activity;
		activity.addEventListener('create', function(e) {
			App.log('Index create');
		});
		activity.addEventListener('start', function(e) {
			App.log('Index start');
		});
		activity.addEventListener('resume', function(e) {
			App.log('Index resume');
		});
		activity.addEventListener('pause', function(e) {
			App.log('Index pause');
		});
		activity.addEventListener('stop', function(e) {
			App.log('Index stop');
		});
		activity.addEventListener('destroy', function(e) {
			App.log('Index destroy');
		});
		activity.addEventListener('restart', function(e) {
			App.log('Index restart');
		});

	}
}