import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Lobby } from "./screens/lobby";
import { Room } from "./screens/room";

function App() {
  return (
    <Routes>
      <Route path={"/"} Component={Lobby} />
      <Route path={"/room/:roomId"} Component={Room} />
    </Routes>
  );
}

export default App;
