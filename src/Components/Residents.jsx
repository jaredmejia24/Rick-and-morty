import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  color: "black",
  margin: "auto",
};

const Residents = ({ resident }) => {
  const [character, setCharacter] = useState({});
  const [statusColor, setStatusColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(resident)
      .then((res) => {
        setCharacter(res.data);
        if (res.data.status === "Alive") {
          setStatusColor("green");
        } else if (res.data.status === "Dead") {
          setStatusColor("red");
        } else {
          setStatusColor("gray");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <li className="character-info">
      {isLoading ? (
        <ClipLoader cssOverride={override} size={130} />
      ) : (
        <>
          <img
            style={{ borderRadius: "1rem" }}
            src={character.image}
            alt="Image not found"
          />
          <ul>
            <li>{character.name}</li>
            <li>
              <div
                style={{ background: statusColor }}
                className="status-circle"
              ></div>
              {character.status} - {character.species}
            </li>
            <li style={{ color: "gray" }}>Origin</li>
            <li>{character.origin?.name}</li>
            <li style={{ color: "gray" }}>Episodes where appear</li>
            <li>{character.episode?.length}</li>
          </ul>
        </>
      )}
    </li>
  );
};

export default Residents;
