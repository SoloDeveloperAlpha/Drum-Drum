import "./App.css";
import DrumMachine from "./DrumMachine";
import AppProvider from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <DrumMachine />
      </div>
    </AppProvider>
  );
}

export default App;
