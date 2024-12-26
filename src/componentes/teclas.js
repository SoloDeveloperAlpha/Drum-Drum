import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContext.js";

const Tecla = ({ tecla, ruta, disp, pwrState }) => {
  const audioRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(AppContext);

  const playAudio = () => {
    if (pwrState && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.error("Error reproduciendo el audio:", err));
    }
  };

  const handleKeydown = useCallback(
    (event) => {
      if (event.key.toUpperCase() === tecla && pwrState) {
        setIsActive(true);
        dispatch({
          type: "MOSTRAR_DIS",
          display: disp,
        });
        playAudio();
      }
    },
    [tecla, disp, dispatch, pwrState]
  );

  const handleKeyup = useCallback(
    (event) => {
      if (event.key.toUpperCase() === tecla) {
        setIsActive(false);
      }
    },
    [tecla]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return (
    <div
      className={`drum-pad ${isActive ? "active" : ""}`}
      id={`tecla${tecla}`}
      onClick={() => {
        if (pwrState) {
          dispatch({
            type: "MOSTRAR_DIS",
            display: disp,
          });
          playAudio();
        }
      }}
    >
      <audio
        className="clip"
        id={tecla}
        src={`${process.env.PUBLIC_URL}${ruta}`}
        ref={audioRef}
        onPlay={() => console.log(`Reproduciendo: ${disp}`)}
        onError={() =>
          console.error(`No se pudo cargar el archivo de audio: ${ruta}`)
        }
      ></audio>
      {tecla}
    </div>
  );
};

Tecla.propTypes = {
  tecla: PropTypes.string.isRequired,
  ruta: PropTypes.string.isRequired,
  disp: PropTypes.string,
  pwrState: PropTypes.bool.isRequired,
};

export default Tecla;
