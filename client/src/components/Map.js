import React, { useState, useEffect } from 'react';

const Map = () => {
  const [google, setGoogle] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (window.google) {
      setGoogle(window.google);
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAnEXPkdA3MyCLjN7jZ19gtSNgkkWQ_j08&libraries=places,geometry`;
      script.onload = () => {
        setGoogle(window.google);
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (google && !map) {
      const mapOptions = {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 8,
      };
      const map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setMap(map);
    }
  }, [google, map]);

  useEffect(() => {
    if (map && !marker) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const location = new google.maps.LatLng(latitude, longitude);
    
          const markerOptions = {
            position: location,
            map: map,
            title: 'My location',
          };
          const marker = new google.maps.Marker(markerOptions);
          setMarker(marker);
    
          setCurrentLocation(location);
    
          map.setCenter(location);
          map.setZoom(15);
          
        }, error => console.log(error));
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [google, map, marker, currentLocation]);
  

  useEffect(() => {
    if (map && !currentLocation && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const location = new google.maps.LatLng(latitude, longitude);
  
          if (marker) {
            marker.setPosition(location);
          } else {
            const markerOptions = {
              position: location,
              map: map,
              title: 'My location',
            };
            const marker = new google.maps.Marker(markerOptions);
            setMarker(marker);
          }
  
          setCurrentLocation(location);
        },
        error => console.log(error)
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [google, map, marker, currentLocation, navigator.geolocation]);
  
  

  if (!google) {
    return <div>Loading Google Maps...</div>;
  }

  return <div id="map" style={{ height: '390px' }}></div>;
};

export default Map; 