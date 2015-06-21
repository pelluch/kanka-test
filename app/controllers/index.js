function doClick(e) {
	alert($.label.text);
}





$.index.open();

var counter = 0;

var bluetooth = require('com.ewin.kanka.bluetooth');
var interval = null;
var temp;

bluetooth.startScan(function(device) {
	Ti.API.info("Connecting");
	bluetooth.connectDevice(device.uniqueId, function(e) {
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
});