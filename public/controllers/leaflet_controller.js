
myApp.controller('LeafletController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from  apts controller");

// Detta är ett get request till urlen /contacts och serverns kommer 
// skicka tillbaka ett response
/*$http.get('/contacts').success(function(response){
	console.log("i got the data");
	$scope.contacts = response;
});*/

$scope.janne = 'janne i leaflet'
console.log($scope.janne)
var mymap = L.map('mapid').setView([59.334591, 18.063240], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/mrliffa/ciwh1527n00c22ps5vuljnkhl/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXJsaWZmYSIsImEiOiJjaXRzZWk2NDYwMDFoMm5tcmdobXVwMmgzIn0.I-e4EO_ZN-gC27258NMZNQ', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'mrliffa/citses8bt00062ipelfijao0j/tiles/256',
accessToken: 'pk.eyJ1IjoibXJsaWZmYSIsImEiOiJjaXRzZWk2NDYwMDFoMm5tcmdobXVwMmgzIn0.I-e4EO_ZN-gC27258NMZNQ'
}).addTo(mymap);



	// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	// 	    //working key but not for L.map:   https://api.mapbox.com/styles/v1/mrliffa/citses8bt00062ipelfijao0j/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXJsaWZmYSIsImEiOiJjaXRzZWk2NDYwMDFoMm5tcmdobXVwMmgzIn0.I-e4EO_ZN-gC27258NMZNQ
	// 	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	// 	    maxZoom: 18,
	// 	    id: 'mrliffa/citses8bt00062ipelfijao0j/tiles/256',
	// 	    accessToken: 'pk.eyJ1IjoibXJsaWZmYSIsImEiOiJjaXRzZWk2NDYwMDFoMm5tcmdobXVwMmgzIn0.I-e4EO_ZN-gC27258NMZNQ'
	// 	}).addTo(mymap);	

	// 		L.marker([51.5, -0.09]).addTo(mymap)
	// 		    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	// 		    .openPopup();







}])