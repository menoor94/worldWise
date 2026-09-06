// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import styles from "./Form.module.css";
import Button from "../assets/Button";
import Message from "../assets/Message";
import Spinner from "../assets/Spinner";

import { useCities } from "../contexts/CitiesContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { useURLLocation } from "../hooks/useURLLocation";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingErr, setGeocodingErr] = useState("");

  const { createCity, isLoading } = useCities();

  const [lat, lng] = useURLLocation();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCity() {
        try {
          setIsLoadingGeoCoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();

          if (!data.countryCode) throw new Error("Try clicking somewhere else");

          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingErr(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCity();
    },
    [lat, lng],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName) return;

    const city = {
      cityName,
      country,
      emoji,
      date,
      position: { lat, lng },
      notes,
    };
    await createCity(city);
    navigate("/app/cities");
  }

  if (isLoadingGeoCoding) return <Spinner />;

  if (geoCodingErr) return <Message message={geoCodingErr} />;

  if (!lat && !lng) return <Message message="Start by Clicking on the map" />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type={"back"}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
