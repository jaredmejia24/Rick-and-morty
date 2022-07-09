import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Residents from "./Residents";
import SearchOptions from "./SearchOptions";
import { ClipLoader } from "react-spinners";
import Pagination from "./Pagination";

const override = {
  display: "flex",
  margin: "4rem auto",
};

const Body = () => {
  const [location, setLocation] = useState({});
  const [allLocations, setAllLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [inputHidden, setInputHidden] = useState("hidden");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [byPage, setBypage] = useState(10);
  let maxLengthInPage = 0;
  let arrayIterationOfPages = [];

  if (location.residents?.length !== 0) {
    maxLengthInPage = location.residents?.length / byPage;
    for (let i = 1; i < maxLengthInPage + 1; i++) {
      arrayIterationOfPages.push(i);
    }
  }

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);


  useEffect(()=>{
    setPage(1);
    setFocused(false);
  },[location])

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
    if (focused) {
      setInputHidden("visible");
    } else {
      setInputHidden("hidden");
    }
  }, [focused]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Rick and Morty Wiki</h1>
      <div className="input-search">
        <input
          autoComplete="off"
          onFocus={onFocus}
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
      </div>
      {isLoading ? (
        <ClipLoader color="white" cssOverride={override} size={300} />
      ) : (
        <>
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
                    onblur={onBlur}
                    setIsLoading={setIsLoading}
                    setLocation={setLocation}
                    location={location}
                    key={location.id}
                  />
                ))}
            </ul>
          )}
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
              <ul className="button-pages-container">
                  {arrayIterationOfPages.map((i) => (
                    <Pagination
                      key={i}
                      page={i}
                      setPage={setPage}
                    />
                  ))}
                </ul>
                <h2 id="pageBody">Residents</h2>
                <ul className="all-residents">
                  {location.residents
                    .slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                    .map((resident) => (
                      <Residents key={resident} resident={resident} />
                    ))}
                </ul>
                <ul className="button-pages-container">
                  {arrayIterationOfPages.map((i) => (
                    <Pagination
                      key={i}
                      page={i}
                      setPage={setPage}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <div style={{ marginTop: "1rem" }} className="character-info">
                <h3 style={{ margin: "auto" }}>No residents</h3>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
