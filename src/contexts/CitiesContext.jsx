import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  isLoading: false,
  cities: [],
  curCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        curCity: action.payload,
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("action Unknown");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [curCity, setCurCity] = useState({});

  const [{ isLoading, cities, curCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(function () {
    async function fetchData() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "error", payload: err });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  }

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({
        type: "cities/deleted",
        payload: id,
      });
    } catch (err) {
      console.error(err);
      dispatch({ type: "error", payload: err });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the Cities Provider");
  return context;
}
export { CitiesProvider, useCities };
