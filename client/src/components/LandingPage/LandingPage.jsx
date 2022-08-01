import React from "react";
import Styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import linkedin from "../../imagenes/linkedin (1).png";
import github from "../../imagenes/github (1).png";
import gmail from "../../imagenes/gmail (1).png";

class LandingPage extends React.Component {
  render() {
    return (
      <div className={Styles.full}>
        <div className={Styles.full_inner}>
          <div className={Styles.content}>
            <h1 className={Styles.titulo}>Videogames</h1>
            <Link to="/home">
              <button className={Styles.btn}>
                <span className={Styles.ingresar}>Get Started</span>
              </button>
            </Link>
          </div>
          <div className={Styles.links}>
            <div className={Styles.mini_box}>
              <a
                href="https://www.linkedin.com/in/kristhianlizcano/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
            </div>

            <div className={Styles.mini_box}>
              <a
                href="https://github.com/Kristhian92"
                target="_blank"
                rel="noreferrer"
              >
                <img src={github} alt="github" />
              </a>
            </div>
            <div className={Styles.mini_box}>
              <a
                href="mailto:kristhianlizcano@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={gmail} alt="gmail" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
