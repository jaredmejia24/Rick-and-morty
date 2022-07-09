import React from "react";
import axios from "axios";

const SearchOptions = ({ location, setLocation, onblur, setIsLoading }) => {
  const changeLocationByClickingOption = () => {
    setIsLoading(true);
    const id = location.id;
    onblur();
    axios
      .get(`https://rickandmortyapi.com/api/location/${id}`)
      .then((res) => {
        setLocation(res.data);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <li onClick={changeLocationByClickingOption} className="each-search-option">
      {location.name}
    </li>
  );
};

export default SearchOptions;
