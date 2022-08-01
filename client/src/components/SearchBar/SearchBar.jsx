import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {NavLink} from 'react-router-dom';
import { getNames } from "../../redux/Actions/actions.js";
import Styles from "../SearchBar/SearchBar.module.css";
import lupa from "../../imagenes/pixlr-bg-result.png";
import home from '../../imagenes/home.png';

export default function SearchBar() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.length > 1) {
      dispatch(getNames(state));
      setState("");
    } else {
      alert("No ingresaste nada en la busqueda");
    }
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={Styles.buscar}>
          <span htmlFor="name"></span>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={state}
            placeholder="Buscar Videojuego"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className={Styles.btn}>
            <img src={lupa} alt="lupa" />
          </button>
          <button type='button' className={Styles.btn2}>
          <NavLink to={"/"} className={Styles.to2}>
            Home  <img src={home} alt="home"/>
          </NavLink>
          </button>
        </div>
      </form>
    </div>
  );
}

