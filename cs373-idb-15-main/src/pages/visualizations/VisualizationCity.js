import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '93vh'
};

const center = {
  lat: 30.2,
  lng: -97.7
};

const apiUrl = "https://worldeatsapi.link/city/random/300";

const VisualizationCity = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Convert the fetched data to the format required by the Marker component

        const newCities = data.map(item => 
        ({
          id: item.id,
          lat: item.latitude,
          lng: item.longitude,
          name: item.name,
          radius: Math.sqrt(item.population) * 150
        }));
        setCities(newCities);
      })
      .catch(error => console.error(error));
  }, []);

  const handleMarkerClick = (city) => {
    window.location.href = `/Cities/${city.id}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <LoadScript
        googleMapsApiKey={"AIzaSyD_Vg__1K0nG-E-fFuLs57dmMIdridwFfc"}

      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
        >
          {cities.map((city, index) => (
            <Circle
            key={index}
            center={{ lat: city.lat, lng: city.lng }}
            radius={city.radius}
            onClick={() => handleMarkerClick(city)}
            options={{
              fillColor: 'red',
              fillOpacity: 0.20,
              strokeColor: 'white',
              strokeOpacity: 0.8,
              strokeWeight: 1,
            }}
          />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default VisualizationCity;
