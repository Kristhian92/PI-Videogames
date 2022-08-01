import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import Cards from "../Cards/Cards.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import Styles from "../Home/Home.module.css";


import {
  filterByGenres,
  filterBySource,
  orderBy,
  getAllVideogames,
  getByGenres,
} from "../../redux/Actions/actions.js";

export default function Home() {
  const allGames = useSelector((state) => state.allVideogames);

  const [currentPage, setCurrentPage] = useState(1);
  const [, /*_orden*/ setOrden] = useState("");
  const gamesPerPage = 15;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const dispatch = useDispatch();

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generos = useSelector((state) => state.genres);

  React.useEffect(() => {
    dispatch(getByGenres());
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames());
    } else {
      dispatch(filterByGenres(e.target.value));
      setCurrentPage(1);
    }
  }

  function handleSource(e) {
    e.preventDefault();
    if (e.target.value === "") {
      dispatch(getAllVideogames());
    } else {
      dispatch(filterBySource(e.target.value));
      setCurrentPage(1);
    }
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={Styles.box}>
        <select onChange={(e) => handleSort(e)}>
          <option value="">Ordenar por...</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="RatingAsc">Rating Asc</option>
          <option value="RatingDesc">Rating Desc</option>
        </select>

        <select id="genre" onChange={(e) => handleFilter(e)}>
          <option value="">Generos</option>
          {generos &&
            generos.map((g) => {
              return (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              );
            })}
        </select>

        <select onChange={(e) => handleSource(e)}>
          
          <option value="api">API</option>
          <option value="created">Created</option>
        </select>
      </div>
      <div>
        <Cards currentGames={currentGames} />
      </div>
      <div>
        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
