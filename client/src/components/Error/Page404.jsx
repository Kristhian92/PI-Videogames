import React from "react";
import Error from "../../imagenes/c09a97a8f18cb8908ea897639cbe4fa8.gif";
import { NavLink } from "react-router-dom";
import Styles from "../Error/Page404.module.css";

export default class Page404 extends React.Component {
  render() {
    return (
      <div>
        <h1 className={Styles.titulo}>ERROR 404: Page Not Found</h1>
        <img src={Error} alt="error" />
        <h2 className={Styles.pregunta}>¿Deseas volver a Home?</h2>
        <div>
          <NavLink to={"/home"} className={Styles.nav}>
            <span className={Styles.opcion}>SI</span>
          </NavLink>
          <NavLink to={"/"} className={Styles.nav}>
            <span className={Styles.opcion}>No</span>
          </NavLink>
        </div>
      </div>
    );
  }
}
