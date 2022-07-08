import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { render } from "react-dom";
import Residents from "./Residents";

const Body = () => {
  const [location, setLocation] = useState({});
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1;
    axios
      .get(`https://rickandmortyapi.com/api/location/${random}`)
      .then((res) => setLocation(res.data));
  }, []);

  const changeLocation = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${searchValue}`)
      .then((res) => setLocation(res.data));
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Rick and Morty Wiki</h1>
      <div className="input-search">
        <input
          className="seach-bar"
          type="text"
          value={searchValue}
          onChange={e=>setSearchValue(e.target.value)}
          placeholder="type location id"
        />
        <button onClick={changeLocation} className="search-button">Search</button>
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
              {location.residents.map(resident => (
                <Residents key={resident} resident={resident}/>
              ))}
            </ul>
          </>
        ): (
            <div style={{marginTop: "1rem"}} className="character-info">
            <h3 style={{margin: "auto"}}>No residents</h3>
            </div>
        )}
      </div>
    </div>
  );
};

export default Body;
