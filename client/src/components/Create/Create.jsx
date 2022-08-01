/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVideogame,
  getByGenres,
  getPlatforms,
} from "../../redux/Actions/actions.js";
import Styles from "../Create/Create.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function validate(input) {
  let errors = {};
  let regex_formatDate = /^((19|20)\d\d)[- /.](([1-9]|[0][1-9]|1[012]))[- /.](([1-9]|[0][1-9]|1[012])|([12][0-9]|3[01]))$/;

  if (!input.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
    errors.name = "Solo se aceptan letras, numeros, guiones medio y parentesis";
  }

  if (
    input.background_image.length !== 0 &&
    !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(input.background_image)
  ) {
    errors.background_image = "invalid URL";
  }

  if (!input.description) {
    errors.description = "La descripcion es requerida";
  } else if (input.description.length > 100) {
    errors.description = "La descripcion es muy larga. (Max = 100 caracteres)";
  }

  else if(!(regex_formatDate.test(input.released))) {
    errors.released = "El formato debe ser: YYYY/MM/DD";
    }            

  if (!input.rating) {
    errors.rating = "El rating es requerido";
  } else if (input.rating > 5) {
    errors.rating = "El rating no debe ser mayor a 5";
  } else if (input.rating < 0) {
    errors.rating = "El rating no puede ser un numero negativo";
  }

  return errors;
}


export default function Create() {
  const [input, setInput] = useState({
    name: "",
    background_image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const generos = useSelector((state) => state.genres);
  const plataformas = useSelector((state) => state.platforms);
  const allNames = useSelector((state) => state.allVideogames);

  useEffect(() => {
    dispatch(getByGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allNames.filter((n) => n.name === input.name);
    if (noRepeat.length !== 0) {
      alert("Ya existe un juego con ese nombre, por favor elije otro");
    } else {
      let error = Object.keys(validate(input));

      if (
        error.length !== 0 ||
        !input.genres.length ||
        !input.platforms.length
      ) {
        alert("Llene los campos correctamente");
        return;
      } else {
        dispatch(createVideogame(input));
        setInput({
          name: "",
          background_image: "",
          description: "",
          released: "",
          rating: "",
          genres: [],
          platforms: [],
        });
        alert("Felicidades, el juego fue creado exitosamente.");
      }
      navigate("/home");
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  }

  function handleGenres(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handlePlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e),
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e),
    });
  }

  return (
    <>
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={Styles.box_form}>
        <div className={Styles.form}>
          <h2 className={Styles.titulo}>CREA TU PROPIO VIDEOJUEGO</h2>

          <div className={Styles.grupo}>
            <input
              className={Styles.create_input}
              type="text"
              required
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />{" "}
            <span className={Styles.barra}></span>
            <label className={Styles.label}>Nombre: </label>
            {errors.name && <p className={Styles.danger}>{errors.name}</p>}
          </div>

          <div className={Styles.grupo}>
            <input
              className={Styles.create_input}
              type="text"
              name="background_image"
              value={input.background_image}
              onChange={(e) => handleChange(e)}
            />
            <span className={Styles.label}></span>
            <label className={Styles.label}>Imagen URL: </label>
            {errors.background_image && <p className={Styles.danger}>{errors.background_image}</p>}
          </div>

          <div className={Styles.grupo}>
            <input
              className={Styles.create_input}
              
              type="text"
              name="released"
              value={input.released}
              id='p'
              onChange={(e) => handleChange(e)}
            />{" "}
            <span className={Styles.barra}></span>
            <label className={Styles.label}>Fecha de lanzamiento: </label>
            {errors.released && (
              <p className={Styles.danger}>{errors.released}</p>
            )}
          </div>

          <div className={Styles.grupo}>
            <input
              className={Styles.create_input}
              required
              type="number"
              name="rating"
              value={input.rating}
              onChange={(e) => handleChange(e)}
            />{" "}
            <span className={Styles.barra}></span>
            <label className={Styles.label}>Rating: </label>
            {errors.rating && <p className={Styles.danger}>{errors.rating}</p>}
          </div>

          <div className={Styles.grupo}>
            <select
              className={Styles.select_create}
              id="genres"
              defaultValue=""
              onChange={(e) => handleGenres(e)}
            >
              <option className={Styles.option_create} value="" disabled hidden>
                Elije los géneros...
              </option>
              {generos.map((g) => {
                return (
                  <option
                  key={g.id}
                  value={g.name}
                  className={Styles.option_create}
                  >
                    {g.name}
                  </option>
                );
              })}
            </select>{" "}
            <span className={Styles.barra}></span>
            <label className={Styles.label}>Generos: </label>
            {input.genres.map((g) => (
              <div className={Styles.box_opcion}>
                <div className={Styles.opcion_title}>{g}</div>
                <button
                  className={Styles.btn_remove}
                  onClick={() => handleDeleteG(g)}
                  key={g}
                  value={g}
                >
                  <span  className={Styles.x}>X</span>
                </button>
              </div>
            ))}
          </div>

          <div className={Styles.grupo}>
            <select
              className={Styles.select_create}
              id="platforms"
              defaultValue=""
              onChange={(e) => handlePlatforms(e)}
            >
              <option className={Styles.option_create} value="" disabled hidden>
                Elija las plataformas...
              </option>
              {plataformas?.map((p) => {
                return (
                  <option className={Styles.option_create} value={p} key={p}>
                    {p}
                  </option>
                );
              })}
            </select>{" "}
            <span className={Styles.barra}></span>
            <label className={Styles.label}>Plataformas: </label>
            {input.platforms.map((p) => (
              <div className={Styles.box_opcion}>
                <div className={Styles.opcion_title}>{p}</div>
                <button
                  className={Styles.btn_remove}
                  onClick={() => handleDeleteP(p)}
                  key={p}
                  value={p}
                >
                  <span className={Styles.x}>X</span>
                </button>
              </div>
            ))}
          </div>

          <div className={Styles.grupo}>
            <textarea
              required
              type="text"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            >
              {" "}
            </textarea>
            <label className={Styles.description}>Descripcion: </label>
            {errors.description && (
              <p className={Styles.danger}>{errors.description}</p>
            )}
          </div>
        </div>
        <div>
          <button type="submit" className={Styles.btn_submit}>
            CREAR VIDEOJUEGO
          </button>
        </div>

        <div>
          <NavLink to={"/home"} className={Styles.back_home}>
            Cancelar
          </NavLink>
        </div>
      </form>
    </div>
  </>
  );
}
