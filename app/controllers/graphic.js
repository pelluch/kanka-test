
function doClick(e) {
	alert($.label.text);
}

var initial = new Date();

exports.onTemperatureChange = function(temp) {
	var last = new Date();
	var seconds = (last.getTime() - initial.getTime())/1000;
	$.webview.evalJS('addPoint("' + seconds + '", ' + temp + ')');
};
