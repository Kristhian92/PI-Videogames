import React from "react";
import Styles from "../Card/Card.module.css";
import { NavLink } from "react-router-dom";
import img from "../../imagenes/d0898894122ab331c6411faee24cd4bd.jpg";


export default function Card({id, name, background_image, rating, platforms, genres}) {
  

  
  
    return (
      <div className={Styles.card}>
        <img src={background_image ? background_image : img} width="400px" height="250px" alt=''/>
        <div className={Styles.card_content}>
          <h3 className={Styles.nombre}>{name}</h3>
          <p className={Styles.genres}>{genres}</p>
          <p className={Styles.rating}>⭐ {rating}</p>
          <p className={Styles.plataformas}>
              🎮: {platforms}
            </p>
          <NavLink to={`/detail/${id}`} className={Styles.navLink}>
            <span className={Styles.leer_mas}>Leer más</span>
          </NavLink>
        </div>
      </div>
    );
  }



