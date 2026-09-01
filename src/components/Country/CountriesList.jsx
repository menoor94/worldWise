import styles from "./CountryList.module.css";
import Spinner from "../../assets/Spinner";
import CountryItem from "./CountryItem";
import Message from "../../assets/Message";
import { useCities } from "../../contexts/CitiesContext";

function CountriesList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Please add your city" />;

  // const countries = [];
  const countries = cities.reduce((acc, cur) => {
    const currentCountry = cur.country;

    return acc.find((c) => c.country === currentCountry) ? acc : [...acc, cur];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
