//leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
//react & react router hooks
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
//Components
import Button from "../assets/Button";
//custom hooks
import { useURLLocation } from "../hooks/useURLLocation";
import { useCities } from "../contexts/CitiesContext";

import styles from "./Map.module.css";
function Map() {
  //states
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    getPosition: getGeoLoacationPos,
    position: geoLocationPos,
    isLoading: isLoadingPos,
  } = useGeolocation();
  const { cities } = useCities();
  const navigate = useNavigate();
  const [mapLat, mapLng] = useURLLocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng],
  );

  useEffect(
    function () {
      if (geoLocationPos)
        setMapPosition([geoLocationPos.lat, geoLocationPos.lng]);
    },
    [geoLocationPos],
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        // center={[52.53586782505711, 13.376933665713324]}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Button onClick={getGeoLoacationPos} type="position">
          {isLoadingPos ? "Loading..." : "use your position"}
        </Button>
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  if (position) map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
