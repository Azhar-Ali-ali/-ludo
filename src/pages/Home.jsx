import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import ModeSelector from "../components/setup/ModeSelector";
import PlayerSelector from "../components/setup/PlayerSelector";
import backgroundImage from "../assets/06f7bc1e9f870646b97d066ab6cd2e97.jpg";
import "./Home.css";

function Home() {
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  return (
    <main
      className="home"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      {showPlayerSelector ? (
        <PlayerSelector />
      ) : showGameSelector ? (
        <ModeSelector
          onLocalPlay={() => setShowPlayerSelector(true)}
        />
      ) : (
        <Hero onPlay={() => setShowGameSelector(true)} />
      )}

      <Footer />
    </main>
  );
}

export default Home;