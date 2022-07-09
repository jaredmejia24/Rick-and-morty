import React from "react";
import axios from "axios";

const SearchOptions = ({ location, setLocation, onblur }) => {
  const changeLocationByClickingOption = () => {
    const id = location.id;
    axios
        .get(`https://rickandmortyapi.com/api/location/${id}`)
        .then((res) => {
          setLocation(res.data);
          onblur();
        })
  };
  return (
    <li onClick={changeLocationByClickingOption} className="each-search-option">
      {location.name}
    </li>
  );
};

export default SearchOptions;
