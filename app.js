$(function() {
    console.log( "ready!" );

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGV5YWRhbSIsImEiOiJjaXJkeWJzNnMwMXp4Z2FtOXhiYmF3dDhwIn0.Prmf1SMXknOFL232tcTS9g';

    var gpxFile = "test.gpx";

    // get the gpx file
    $.ajax(gpxFile).done(function(gpx) {
		var geoJSONResult = toGeoJSON.gpx(gpx);
		var geoJSONCoordinates = geoJSONResult.features[0].geometry.coordinates;

		var geoJSONCoordinatesCenter = Math.round(geoJSONCoordinates.length / 2);

	
		// start the map
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			center: geoJSONCoordinates[geoJSONCoordinatesCenter],
			zoom: 13
		});

		map.on('load', function () {
		    map.addSource("route", {
		        "type": "geojson",
		        "data": {
		            "type": "Feature",
		            "properties": {},
		            "geometry": {
		                "type": "LineString",
		                "coordinates": geoJSONCoordinates
		            }
		        }
		    });

		    map.addLayer({
		        "id": "route",
		        "type": "line",
		        "source": "route",
		        "layout": {
		            "line-join": "round",
		            "line-cap": "round"
		        },
		        "paint": {
		            "line-color": "#77c3d2",
		            "line-width": 3
		        }
		    });

			map.addLayer({
		        "id": "point",
		        "source": "point",
		        "type": "symbol",
		        "layout": {
		            "icon-image": "airport-15",
		            "icon-rotate": 90
		        }
		    });

		});

	}); // end gpx fetch

});