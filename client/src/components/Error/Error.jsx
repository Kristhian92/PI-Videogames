import React from "react";
import img from "../../imagenes/kirby_sad_by_lisuplaygames_dazwi2p-fullview.png";
import Styles from "../Error/Error.module.css";

export default function Error() {
  return (
    <div className={Styles.kirby}>
      <h1>No se encontraron Videojuegos</h1>
      <img src={img} alt="kirby" />
    </div>
  );
}
