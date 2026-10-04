import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import GameSetup from "./pages/GameSetup";
import ComputerSetup from "./pages/ComputerSetup";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* GAME MODE SELECTION */}
        <Route
          path="/game-setup"
          element={<GameSetup />}
        />

        {/* COMPUTER GAME SETUP */}
        <Route
          path="/computer-setup"
          element={<ComputerSetup />}
        />

        {/* GAME */}
        <Route
          path="/game"
          element={<Game />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;