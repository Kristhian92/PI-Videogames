import React from "react";
import loading from "../../imagenes/cargando-unscreen.gif";
import Styles from "../Loading/Loading.module.css";

export default function Loading() {
  return (
    <div className={Styles.box_loading}>
      <img src={loading} alt="loading" />
    </div>
  );
}
