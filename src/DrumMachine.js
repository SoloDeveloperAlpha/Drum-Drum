import React, { useContext, useState } from "react";
import Tecla from "./componentes/teclas";
import { AppContext } from "./context/AppContext";

const DrumMachine = () => {
  const [isOff, setIsOff] = useState(true);
  const [isOffBank, setIsOffBank] = useState(true);
  const { state } = useContext(AppContext);
  const { display } = state;
  let dis = null;
  if (isOff === true) {
    dis = null;
  } else {
    dis = display;
  }
  return (
    <div id="drum-machine">
      <div id="keyboard">
        <Tecla tecla="Q" ruta="/audio/Heater-1.mp3" disp="Heater 1" />
        <Tecla tecla="W" ruta="/audio/Heater-2.mp3" disp="Heater 2" />
        <Tecla tecla="E" ruta="/audio/Heater-3.mp3" disp="Heater 3" />
        <Tecla tecla="A" ruta="/audio/Heater-4.mp3" disp="Heater 4" />
        <Tecla tecla="S" ruta="/audio/Clap.mp3" disp="Clap" />
        <Tecla tecla="D" ruta="/audio/Open-HH.mp3" disp="Open HH" />
        <Tecla tecla="Z" ruta="/audio/Kick_n_Hat.mp3" disp="Kick n Hat" />
        <Tecla tecla="X" ruta="/audio/Kick.mp3" disp="Kick" />
        <Tecla tecla="C" ruta="/audio/Closed-HH.mp3" disp="Closed HH" />
      </div>
      <div id="panel">
        <div id="display">
          <span>Power</span>
          <div
            className={isOff === true ? "pw-btn off" : "pw-btn"}
            onClick={(event) => setIsOff(!isOff)}
          ></div>
        </div>
        <span id="padisplay">{dis}</span>
        <div id="display">
          <span>Bank</span>
          <div
            className={isOffBank === true ? "pw-btn off" : "pw-btn"}
            onClick={(event) => setIsOffBank(!isOffBank)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DrumMachine;
