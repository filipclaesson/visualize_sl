var http = require('http');

function getTraficlab(query, callback) {
	console.log(query.siteId + ", " + query.timeWindow);
    return http.get({
        host: 'api.sl.se',
        path: 'http://api.sl.se/api2/realtimedepartures.json?key=ded0143863474a28b315d3289f70fa32&siteid=' + query.siteId + '&timewindow='+ query.timeWindow
    }, function(response) {
        // Continuously update stream with data
        //console.log(response);
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
}

function saveToDb(data, callback){

}



module.exports = {
  getTraficlab: getTraficlab
};
