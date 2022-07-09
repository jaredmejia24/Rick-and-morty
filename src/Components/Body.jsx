import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Residents from "./Residents";
import SearchOptions from "./SearchOptions";

const Body = () => {
  const [location, setLocation] = useState({});
  const [allLocations, setAllLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [focused, setFocused] = React.useState(false);
  const [inputHidden, setInputHidden] = useState("hidden");

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1;
    axios
      .get(`https://rickandmortyapi.com/api/location/${random}`)
      .then((res) => setLocation(res.data));
  }, []);

  const changeLocation = () => {
    if (searchValue === "") {
      alert("Write a name of a location");
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/location?name=${searchValue}`)
        .then((res) => setLocation(res.data.results[0]))
        .catch(() => alert("invalid location"));
    }
  };

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location?name=${searchValue}`)
      .then((res) => {
        const array = res.data.results.filter((value, i) => {
          return i < 8;
        });
        setAllLocations(array);
      });
  }, [searchValue]);

  useEffect(() => {
    setTimeout(()=>{
      if (focused) {
        setInputHidden("visible");
      } else {
        setInputHidden("hidden");
      }
    },1)
  }, [focused]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Rick and Morty Wiki</h1>
      <div className="input-search">
        <input
        autoComplete="off"
          onFocus={onFocus}
          onBlur={onBlur}
          id="searchBar"
          className="seach-bar"
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="type a location"
        />
        <button onClick={changeLocation} className="search-button">
          Search
        </button>
        {searchValue !== "" && (
          <ul
            style={{ visibility: inputHidden }}
            className="search-options-container"
          >
            {allLocations
              .filter((location) => {
                if (
                  searchValue !== "" &&
                  location.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ) {
                  return location;
                }
              })
              .map((location) => (
                <SearchOptions
                setLocation={setLocation}
                  location={location}
                  key={location.id}
                />
              ))}
          </ul>
        )}
      </div>
      <div className="location-info">
        <h2>{location.name}</h2>
        <ul>
          <li>
            <b>type: </b>
            {location.type}
          </li>
          <li>
            <b>dimension: </b>
            {location.dimension}
          </li>
          <li>
            <b>population: </b>
            {location.residents?.length}
          </li>
        </ul>
      </div>
      <div className="residents">
        {location.residents?.length > 0 ? (
          <>
            <h2>Residents</h2>
            <ul className="all-residents">
              {location.residents.map((resident) => (
                <Residents key={resident} resident={resident} />
              ))}
            </ul>
          </>
        ) : (
          <div style={{ marginTop: "1rem" }} className="character-info">
            <h3 style={{ margin: "auto" }}>No residents</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
