

$.getView().open();
var rows = {};
var counter = 0;


var interval = null;
var temp;
App.log('Test');

function onOpen(e) {
	
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

		},
		onUndiscover: function(device) {
			App.log('Undiscovered ', device);
			if(rows[device.uniqueId]) {
				rows[device.uniqueId].update(device);
			}
		}
	});
}