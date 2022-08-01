import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getVideogame } from "../../redux/Actions/actions";
import img from "../../imagenes/d0898894122ab331c6411faee24cd4bd.jpg";
import Styles from "../Detail/Detail.module.css";
import Loading from "../Loading/Loading.jsx";

export default function Detail() {
  const [carga, setCarga] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getVideogame(id)).then(() => setCarga(false));
  }, [dispatch, id]);

  const details = useSelector((state) => state.videogame);

  if (carga) {
    return <Loading />;
  }

  var regex = /(<([^>]+)>)/gi;

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.main_card}>
        <div className={Styles.card_left}>
          <div className={Styles.card_detail}>
            <h1 className={Styles.nombre}>{details.name}</h1>
            <div className={Styles.card_cat}>
              <p className={Styles.rating}>⭐ {details.rating}</p>
              <p className={Styles.genres}>
                {details.genres?.map((g) => (g.name ? g.name : g)).join("| ")}
              </p>
              <p className={Styles.fecha}>📅{details.released}</p>
            </div>
            <div className={Styles.description}>
              📌{details.description?.replace(regex, "").replace("&#39", "")}
            </div>
            <div className={Styles.plataformas}>
              🎮: {details.platforms?.join(", ")}
            </div>
          </div>
        </div>
        <div className={Styles.card_right}>
          <img
            src={details.background_image ? details.background_image : img}
            alt={`${details.name}'s`}
            width="300px"
            heigth="150px"
          />
        </div>
      </div>
      <div>
        <NavLink to={"/home"} className={Styles.btn}>
          <span>↵ Back Home</span>
        </NavLink>
      </div>
    </div>
  );
}
