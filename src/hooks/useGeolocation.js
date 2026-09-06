import { useState } from "react";

export function useGeolocation(defaultPos = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPos);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator) throw new Error("Could not get your position");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }
  return { getPosition, error, isLoading, position };
}
