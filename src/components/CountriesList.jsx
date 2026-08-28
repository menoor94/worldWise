import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Please add your city" />;

  // const countries = [];
  const countries = cities.reduce((acc, cur) => {
    const currentCountry = cur.country;

    return acc.find((c) => c.country === currentCountry) ? acc : [...acc, cur];
  }, []);
  console.log(countries);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
