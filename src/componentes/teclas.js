import React, { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Tecla = (props) => {
  const audioRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { dispatch } = useContext(AppContext);
  function playAudio() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  function handlePlay() {
    console.log("Audio is playing!");
  }

  // Esta función maneja la pulsación de teclas
  function handleKeydown(event) {
    if (event.key.toUpperCase() === props.tecla && props.disp !== null) {
      setIsActive(true);
      dispatch({
        type: "MOSTRAR_DIS",
        display: props.disp,
      });
      playAudio();
    }
  }

  // Esta función maneja cuando se suelta una tecla
  function handleKeyup(event) {
    if (event.key.toUpperCase() === props.tecla) {
      setIsActive(false);
    }
  }

  // Añade el evento de escucha cuando el componente se monta
  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    // Elimina el evento de escucha cuando el componente se desmonta
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <div
      className={isActive === false ? "drum-pad" : "drum-pad active"}
      id={`tecla${props.tecla}`}
      onClick={() => {
        dispatch({
          type: "MOSTRAR_DIS",
          display: props.disp,
        });
        playAudio();
      }}
    >
      <audio
        className="clip"
        id={props.tecla}
        src={props.ruta}
        ref={audioRef}
        onPlay={handlePlay}
      ></audio>
      {props.tecla}
    </div>
  );
};

export default Tecla;
