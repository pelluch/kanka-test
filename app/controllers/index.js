function doClick(e) {
    alert($.label.text);
}





$.index.open();

var bluetooth = require('com.ewin.kanka.bluetooth');
bluetooth.startScan(function(device) {
	Ti.API.info("Connecting");
	bluetooth.connectDevice(device.uniqueId, function(e) {
		Ti.API.info(JSON.stringify(e));
	});
});