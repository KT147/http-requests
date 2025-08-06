// import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longtitude
      );

      resolve(sortedPlaces)
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  // const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then ((resData) => {
  //     setAvailablePlaces (resData.places)
  //   })
  // }, []);
  // teeb sama välja, mis all

  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    // setFetchedData: setAvailablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  // useEffect(() => {
  // setIsFetching(true);
  // async function fetchPlaces() {
  //   try {

  //     } catch (error) {
  //       setError({
  //         message:
  //           error.message || "Could not fetch places, please try again later",
  //       });
  //       setIsFetching(false);
  //     }

  //   }

  //   fetchPlaces();
  // }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetchind places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
