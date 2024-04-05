import { useState, useRef, useEffect } from "react";
import "./Map.css";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  DirectionsRenderer,
  DirectionsService,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";

const Map = () => {
  let destination = { lat: 52.03, lng: 20.5 };
  let origin = { lat: 52.031, lng: 20.7 };
  const [libraries] = useState(["places", "routes", "streetView", "geometry"]);

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [window, setWindow] = useState(false);

  const [orders, setOrders] = useState([]);
  const [deliverers, setDeliverers] = useState([{ name: "", status: "" }]);

  useEffect(() => {
    axios.get("http://localhost:8000/orders/waiting", {}).then((response) => {
      // setOrders(response.data);
      setOrders(response.data);
    });

    axios.get("http://localhost:8000/delivery", {}).then((response) => {
      setDeliverers({
        name: response.data[0].name,
        status: response.data[0].status,
      });
    });
    // const callApi = async () => {
    //     let responce = await  axios.get("http://localhost:8000/orders/waiting", {})
    //     console.log("Responce:", responce.data)
    //     setOrders(responce.data)
    // }

    // function callApiEveryNSeconds(n) {
    //     setInterval(callApi, n * 1000);
    //   }

    //   callApiEveryNSeconds(5);
  }, [map]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  var directionDisplay;
  var directionsService;
  var directionsRenderer;
  var stepDisplay;
  var position;
  var marker = [];
  var polyline = [];
  var poly2 = [];
  var poly = null;
  var startLocation = [];
  var endLocation = [];
  var timerHandle = [];
  var currentDistance = [];

  var speed = 0.000005,
    wait = 1;
  var infowindow = null;

  var myPano;
  var panoClient;
  var nextPanoId;

  var startLoc = new Array();
  startLoc[0] = "Iggy Pizza, Wrocław";

  var endLoc = new Array();
  var idEndLoc = new Array();
  orders.forEach((element) => {
    endLoc.push(element[1]);
    idEndLoc.push(element[0]);
  });

  // var endLoc = new Array();
  // orders.forEach((element) => {
  //   endLoc.push(element);
  // });

  var Colors = ["#FF0000", "#00FF00", "#0000FF"];

  const onMapLoad = (map) => {
    setMap(map);

    google.maps.LatLng.prototype.distanceFrom = function (newLatLng) {
      var EarthRadiusMeters = 6378137.0; // meters 6371000.0//
      var lat1 = this.lat();
      var lon1 = this.lng();
      var lat2 = newLatLng.lat();
      var lon2 = newLatLng.lng();
      var dLat = ((lat2 - lat1) * Math.PI) / 180;
      var dLon = ((lon2 - lon1) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = EarthRadiusMeters * c;
      return d;
    };

    google.maps.LatLng.prototype.latRadians = function () {
      return (this.lat() * Math.PI) / 180;
    };

    google.maps.LatLng.prototype.lngRadians = function () {
      return (this.lng() * Math.PI) / 180;
    };

    // === A method for testing if a point is inside a polygon
    // === Returns true if poly contains point
    // === Algorithm shamelessly stolen from http://alienryderflex.com/polygon/
    google.maps.Polygon.prototype.Contains = function (point) {
      var j = 0;
      var oddNodes = false;
      var x = point.lng();
      var y = point.lat();
      for (var i = 0; i < this.getPath().getLength(); i++) {
        j++;
        if (j == this.getPath().getLength()) {
          j = 0;
        }
        if (
          (this.getPath().getAt(i).lat() < y &&
            this.getPath().getAt(j).lat() >= y) ||
          (this.getPath().getAt(j).lat() < y &&
            this.getPath().getAt(i).lat() >= y)
        ) {
          if (
            this.getPath().getAt(i).lng() +
              ((y - this.getPath().getAt(i).lat()) /
                (this.getPath().getAt(j).lat() -
                  this.getPath().getAt(i).lat())) *
                (this.getPath().getAt(j).lng() -
                  this.getPath().getAt(i).lng()) <
            x
          ) {
            oddNodes = !oddNodes;
          }
        }
      }
      return oddNodes;
    };

    // === A method which returns the approximate area of a non-intersecting polygon in square metres ===
    // === It doesn't fully account for spherical geometry, so will be inaccurate for large polygons ===
    // === The polygon must not intersect itself ===
    google.maps.Polygon.prototype.Area = function () {
      var a = 0;
      var j = 0;
      var b = this.Bounds();
      var x0 = b.getSouthWest().lng();
      var y0 = b.getSouthWest().lat();
      for (var i = 0; i < this.getPath().getLength(); i++) {
        j++;
        if (j == this.getPath().getLength()) {
          j = 0;
        }
        var x1 = this.getPath()
          .getAt(i)
          .distanceFrom(
            new google.maps.LatLng(this.getPath().getAt(i).lat(), x0)
          );
        var x2 = this.getPath()
          .getAt(j)
          .distanceFrom(
            new google.maps.LatLng(this.getPath().getAt(j).lat(), x0)
          );
        var y1 = this.getPath()
          .getAt(i)
          .distanceFrom(
            new google.maps.LatLng(y0, this.getPath().getAt(i).lng())
          );
        var y2 = this.getPath()
          .getAt(j)
          .distanceFrom(
            new google.maps.LatLng(y0, this.getPath().getAt(j).lng())
          );
        a += x1 * y2 - x2 * y1;
      }
      return Math.abs(a * 0.5);
    };

    // === A method which returns the length of a path in metres ===
    google.maps.Polygon.prototype.Distance = function () {
      var dist = 0;
      for (var i = 1; i < this.getPath().getLength(); i++) {
        dist += this.getPath()
          .getAt(i)
          .distanceFrom(this.getPath().getAt(i - 1));
      }
      return dist;
    };

    // === A method which returns the bounds as a GLatLngBounds ===
    google.maps.Polygon.prototype.Bounds = function () {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.getPath().getLength(); i++) {
        bounds.extend(this.getPath().getAt(i));
      }
      return bounds;
    };

    // === A method which returns a GLatLng of a point a given distance along the path ===
    // === Returns null if the path is shorter than the specified distance ===
    google.maps.Polygon.prototype.GetPointAtDistance = function (metres) {
      // some awkward special cases
      if (metres == 0) return this.getPath().getAt(0);
      if (metres < 0) return null;
      if (this.getPath().getLength() < 2) return null;
      var dist = 0;
      var olddist = 0;
      for (var i = 1; i < this.getPath().getLength() && dist < metres; i++) {
        olddist = dist;
        dist += this.getPath()
          .getAt(i)
          .distanceFrom(this.getPath().getAt(i - 1));
      }
      if (dist < metres) {
        return null;
      }
      var p1 = this.getPath().getAt(i - 2);
      var p2 = this.getPath().getAt(i - 1);
      var m = (metres - olddist) / (dist - olddist);
      //  return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
      return google.maps.geometry.spherical.interpolate(p1, p2, m);
    };

    // === A method which returns an array of GLatLngs of points a given interval along the path ===
    google.maps.Polygon.prototype.GetPointsAtDistance = function (metres) {
      var next = metres;
      var points = [];
      // some awkward special cases
      if (metres <= 0) return points;
      var dist = 0;
      var olddist = 0;
      for (var i = 1; i < this.getPath().getLength(); i++) {
        olddist = dist;
        dist += this.getPath()
          .getAt(i)
          .distanceFrom(this.getPath().getAt(i - 1));
        while (dist > next) {
          var p1 = this.getPath().getAt(i - 1);
          var p2 = this.getPath().getAt(i);
          var m = (next - olddist) / (dist - olddist);
          points.push(
            new google.maps.LatLng(
              p1.lat() + (p2.lat() - p1.lat()) * m,
              p1.lng() + (p2.lng() - p1.lng()) * m
            )
          );
          next += metres;
        }
      }
      return points;
    };

    // === A method which returns the Vertex number at a given distance along the path ===
    // === Returns null if the path is shorter than the specified distance ===
    google.maps.Polygon.prototype.GetIndexAtDistance = function (metres) {
      // some awkward special cases
      if (metres == 0) return this.getPath().getAt(0);
      if (metres < 0) return null;
      var dist = 0;
      var olddist = 0;
      for (var i = 1; i < this.getPath().getLength() && dist < metres; i++) {
        olddist = dist;
        dist += this.getPath()
          .getAt(i)
          .distanceFrom(this.getPath().getAt(i - 1));
      }
      if (dist < metres) {
        return null;
      }
      return i;
    };

    // === A function which returns the bearing between two vertices in decgrees from 0 to 360===
    // === If v1 is null, it returns the bearing between the first and last vertex ===
    // === If v1 is present but v2 is null, returns the bearing from v1 to the next vertex ===
    // === If either vertex is out of range, returns void ===
    google.maps.Polygon.prototype.Bearing = function (v1, v2) {
      if (v1 == null) {
        v1 = 0;
        v2 = this.getPath().getLength() - 1;
      } else if (v2 == null) {
        v2 = v1 + 1;
      }
      if (
        v1 < 0 ||
        v1 >= this.getPath().getLength() ||
        v2 < 0 ||
        v2 >= this.getPath().getLength()
      ) {
        return;
      }
      var from = this.getPath().getAt(v1);
      var to = this.getPath().getAt(v2);
      if (from.equals(to)) {
        return 0;
      }
      var lat1 = from.latRadians();
      var lon1 = from.lngRadians();
      var lat2 = to.latRadians();
      var lon2 = to.lngRadians();
      var angle = -Math.atan2(
        Math.sin(lon1 - lon2) * Math.cos(lat2),
        Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
      );
      if (angle < 0.0) angle += Math.PI * 2.0;
      angle = (angle * 180.0) / Math.PI;
      return parseFloat(angle.toFixed(1));
    };

    // === Copy all the above functions to GPolyline ===
    google.maps.Polyline.prototype.Contains =
      google.maps.Polygon.prototype.Contains;
    google.maps.Polyline.prototype.Area = google.maps.Polygon.prototype.Area;
    google.maps.Polyline.prototype.Distance =
      google.maps.Polygon.prototype.Distance;
    google.maps.Polyline.prototype.Bounds =
      google.maps.Polygon.prototype.Bounds;
    google.maps.Polyline.prototype.GetPointAtDistance =
      google.maps.Polygon.prototype.GetPointAtDistance;
    google.maps.Polyline.prototype.GetPointsAtDistance =
      google.maps.Polygon.prototype.GetPointsAtDistance;
    google.maps.Polyline.prototype.GetIndexAtDistance =
      google.maps.Polygon.prototype.GetIndexAtDistance;
    google.maps.Polyline.prototype.Bearing =
      google.maps.Polygon.prototype.Bearing;
  };

  function createMarker(latlng, icon) {
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: icon,
      zIndex: Math.round(latlng.lat() * -100000) << 5,
    });

    return marker;
  }

  function setRoutes(i) {
    var directionsDisplay = new Array();
    let routeID = idEndLoc[i];
    //   for (var i = 0; i < endLoc.length; i++) {
    if (endLoc.length !== 0) {
      if (deliverers.status === "On") {
        deliverers.status = "Off";
        console.log(deliverers);
        var travelMode = google.maps.DirectionsTravelMode.DRIVING;

        var request = {
          origin: startLoc[0],
          destination: endLoc[i],
          travelMode: travelMode,
        };

        //   const directionsService = new google.maps.DirectionsService();
        //   const directionsRenderer = new google.maps.DirectionsRenderer();

        new google.maps.DirectionsService().route(
          request,
          makeRouteCallback(
            //   directionsService,
            //   directionsRenderer,
            i,
            directionsDisplay[i],
            routeID
          )
        );
        // }
      }

      // var travelMode = google.maps.DirectionsTravelMode.DRIVING;

      // var request = {
      //   origin: startLoc[0],
      //   destination: endLoc[i],
      //   travelMode: travelMode,
      // };

      // directionsService.route(
      //   request,
      //   makeRouteCallback(
      //     directionsService,
      //     directionsRenderer,
      //     i,
      //     directionsDisplay[i]
      //   )
      // );

      function makeRouteCallback(
        // directionsService,
        // directionsRenderer,
        routeNum,
        disp,
        routeID
      ) {
        if (polyline[routeNum] && polyline[routeNum].getMap() !== null) {
          startAnimation(routeNum);
          return;
        }
        return function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            var bounds = new google.maps.LatLngBounds();
            var route = response.routes[0];
            startLocation[routeNum] = new Object();
            endLocation[routeNum] = new Object();

            polyline[routeNum] = new google.maps.Polyline({
              path: [],
              strokeColor: "#FFFF00",
              strokeWeight: 3,
            });

            poly2[routeNum] = new google.maps.Polyline({
              path: [],
              strokeColor: "#FFFF00",
              strokeWeight: 3,
            });

            // For each route, display summary information.
            var path = response.routes[0].overview_path;
            var legs = response.routes[0].legs;

            disp = new google.maps.DirectionsRenderer(response);
            disp.setDirections(response);
            disp.setMap(map);
            console.log(disp);

            // disp = new google.maps.DirectionsRenderer(response);
            // disp.setMap(map);
            // disp.setDirections(response);

            //Markers
            for (i = 0; i < legs.length; i++) {
              if (i == 0) {
                startLocation[routeNum].latlng = legs[i].start_location;
                startLocation[routeNum].address = legs[i].start_address;
                // marker = google.maps.Marker({map:map,position: startLocation.latlng});
                marker[routeNum] = createMarker(legs[i].start_location);
              }

              endLocation[routeNum].latlng = legs[i].end_location;
              endLocation[routeNum].address = legs[i].end_address;
              var steps = legs[i].steps;

              for (let j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;

                for (let k = 0; k < nextSegment.length; k++) {
                  polyline[routeNum].getPath().push(nextSegment[k]);
                  // console.log(disp.routes[0].legs[i].steps[j].path[k].lat())
                  // console.log(nextSegment[k].lat())
                  //bounds.extend(nextSegment[k]);
                }
              }
            }
          }
          //   polyline[routeNum].setMap(map);
          //map.fitBounds(bounds);
          startAnimation(routeNum, disp, routeID);
          // clearRoute(routeNum);
        }; // else alert("Directions request failed: "+status);
      }
    }
  }

  var lastVertex = 1;
  var stepnum = 0;
  var step = 25; // 5; // metres
  var tick = 10; //100; // milliseconds
  var eol = [];
  //----------------------------------------------------------------------
  function updatePoly(i, d) {
    // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
    if (poly2[i].getPath().getLength() > 20) {
      poly2[i] = new google.maps.Polyline([
        polyline[i].getPath().getAt(lastVertex - 1),
      ]);
      // map.addOverlay(poly2)
    }

    if (polyline[i].GetIndexAtDistance(d) < lastVertex + 2) {
      if (poly2[i].getPath().getLength() > 1) {
        poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1);
      }
      poly2[i]
        .getPath()
        .insertAt(
          poly2[i].getPath().getLength(),
          polyline[i].GetPointAtDistance(d)
        );
    } else {
      poly2[i]
        .getPath()
        .insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);
    }
  }
  //----------------------------------------------------------------------------
  const updateOrder = (i) => {
    axios.post("http://localhost:8000/orders/updateOrder", {
      id: i,
    });
  };

  function animate(index, d, disp, routeID) {
    if (d > eol[index]) {
      //map.panTo(p);
      marker[index].setPosition(endLocation[index].latlng);
      marker[index].setOptions({
        zIndex: Math.round(endLocation[index].latlng.lat() * -100000) << 5,
      });
      disp.setMap(null);
      disp = [];
      marker[index].setMap(null);
      deliverers.status = "On";
      console.log(endLoc.length, index);
      console.log(routeID);
      updateOrder(routeID);
      if (endLoc.length - 1 > index) setRoutes(index + 1);
      console.log(deliverers);
      return;
    }
    var p = polyline[index].GetPointAtDistance(d);
    //map.panTo(p);
    marker[index].setPosition(p);
    marker[index].setOptions({
      zIndex: Math.round(p.lat() * -100000) << 5,
    });
    updatePoly(index, d);
    timerHandle[index] = setTimeout(() => {
      animate(index, d + step, disp, routeID);
    }, tick);
    currentDistance[index] = d + step;
  }

  //-------------------------------------------------------------------------

  function startAnimation(index, disp, routeID) {
    if (timerHandle[index]) clearTimeout(timerHandle[index]);
    eol[index] = polyline[index].Distance();
    // map.setCenter(polyline[index].getPath().getAt(0));

    poly2[index] = new google.maps.Polyline({
      path: [polyline[index].getPath().getAt(0)],
      strokeColor: "#FFFF00",
      strokeWeight: 3,
    });

    timerHandle[index] = setTimeout(() => {
      animate(index, 50, disp, routeID);
    }, 2000); // Allow time for the initial map display
    currentDistance[index] = 50;
  }
  // setInterval(setRoutes(), 7000);

  // for (var i = 0; i < endLoc.length; i++) {
  //     if(deliverers.status === "On") setRoutes(i);
  // }
  setRoutes(0);

  return isLoaded ? (
    <>
      <div className="map-box">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
          }}
          zoom={13}
          center={{ lat: 51.107883, lng: 17.038538 }}
          //   center={{ lat: 52.031, lng: 20.7 }}
          options={{
            mapTypeId: google.maps.MapTypeId.ROADMAP,
          }}
          onLoad={(map) => onMapLoad(map)}
        >
          <MarkerF
            position={{ lat: 51.111120449745734, lng: 17.03385904166937 }}
            onClick={() => {
              setWindow(true);
            }}
          ></MarkerF>

          {window && (
            <InfoWindow
              position={{ lat: 51.110883, lng: 17.038538 }}
              onCloseClick={() => {
                setWindow(false);
              }}
            >
              <>XPP</>
            </InfoWindow>
          )}

          {/* <Marker position={destination} />
          <Marker position={origin} />
          {directions && <DirectionsRenderer directions={directions} />} */}
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
};
export default Map;
