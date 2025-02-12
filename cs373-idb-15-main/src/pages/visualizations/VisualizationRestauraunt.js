import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '93vh'
};

const center = {
  lat: 30.2,
  lng: -97.7
};

const apiUrl = "https://worldeatsapi.link/restaurants/random/100";

const VisualizationRestauraunt = () => {
  const [locations, setLocations] = useState([]);
  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Convert the fetched data to the format required by the Marker component

        const newLocations = data.map(item => 
        ({
          id: item.id,
          lat: item.latitude,
          lng: item.longitude,
          name: item.name,
          img_url: item.image_urls[0]
        }));
        setLocations(newLocations);
      })
      .catch(error => console.error(error));
  }, []);

  const handleMarkerClick = (location) => {
    window.location.href = `/restaurants/${location.id}`;
  };

  const handleMapLoad = (map) => {
    setZoom(map.getZoom());
    map.addListener('zoom_changed', () => {
      setZoom(map.getZoom());
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <LoadScript
        googleMapsApiKey={"AIzaSyD_Vg__1K0nG-E-fFuLs57dmMIdridwFfc"}

      >
        <GoogleMap
          onLoad={handleMapLoad}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              icon={{
                url: location.img_url,
                scaledSize: new window.google.maps.Size(5 * zoom + 15, 5 * zoom + 15),
              }}
              onClick={() => handleMarkerClick(location)}
            >
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default VisualizationRestauraunt;
