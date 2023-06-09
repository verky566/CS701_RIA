(function () {
    window.onload = init;
    let initMatch = null;
    let latitude = null;
    let longitude = null;
    let currLatitude = null;
    let currLongitude = null;
    let pathLat = [];
    let pathLong = [];

    // gets current position
    function getLocation() {
        navigator.geolocation.getCurrentPosition(startTrackingLocation);
    }

    // register the event handlers
    function init() {
        document.getElementById("startButton").onclick = getLocation;
    }

    // starts tracking the bird
    function startTrackingLocation(position) {
        if (initMatch === null || 0) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            currLatitude = latitude;
            currLongitude = longitude;

            pathLat.push(latitude);
            pathLong.push(longitude);
        }

        initMatch++;

        if (initMatch > 0) {
            documentLoc();
        }
        showMarker(); // display markers

        document.getElementById("counter").innerHTML = "Update#: " + initMatch;
        document.getElementById("latitude").innerHTML =
            "Start Latitude: " + latitude;
        document.getElementById("longitude").innerHTML =
            "Start Longitude: " + longitude;
        document.getElementById("currentLatitude").innerHTML =
            "Current Latitude: " + currLatitude;
        document.getElementById("currentLongitude").innerHTML =
            "Current Longitude: " + currLongitude;
    }

    function documentLoc() {
        if (initMatch > 0) {
            setTimeout(getLocation, 3000);
        }

        if (initMatch > 1) {
            currLatitude = currLatitude + Math.random() / 300;
            currLongitude = currLongitude - Math.random() / 300;

            pathLat.push(currLatitude);
            pathLong.push(currLongitude);
        }
    }

    function showMarker() {
        //object representing a latitude/longitude pair - LatLng
        let startPosition = new google.maps.LatLng(latitude, longitude);
        let currentPosition = new google.maps.LatLng(
            currLatitude,
            currLongitude
        );

        let mapOptions = {
            zoom: 14,
            center: currentPosition,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        let initMark = new google.maps.Marker({
            position: startPosition
        });

        let currMark = new google.maps.Marker({
            position: currentPosition
        });

        initMark.setMap(map);
        currMark.setMap(map);

        if (initMatch > 1) {
            for (let i = 0; i < pathLat.length - 1; i++) {
                //this is where we customize line drawn
                let routing = new google.maps.Polyline({
                    path: [
                        new google.maps.LatLng(pathLat[i], pathLong[i]),
                        new google.maps.LatLng(pathLat[i + 1], pathLong[i + 1])
                    ],
                    //change the color and boldness
                    strokeColor: "#FF69B4",
                    strokeWeight: 5
                });
                routing.setMap(map);
            }
        }
    }
})();
