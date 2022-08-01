import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Styles from "../NavBar/NavBar.module.css";
import imagen from "../../imagenes/videogame.png";



export default function NavBar() {
  
 

  return (
    <nav className={Styles.nav}>
      <div className={Styles.busqueda}>
        <SearchBar />
      </div>
      <div className={Styles.imagencita}>
        <img src={imagen} alt="mario.gif" className={Styles.gif} />
      </div>
      <div className={Styles.search}>
        
        <span className={Styles.opcion}>
          <NavLink to={"/create"} className={Styles.to}>
            Create Videogame
          </NavLink>
        </span>
      </div>
    </nav>
  );
}
