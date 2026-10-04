import { useState } from "react";

import ModeSelector from "../components/setup/ModeSelector";
import PlayerSelector from "../components/setup/PlayerSelector";

function GameSetup() {
  const [selectedMode, setSelectedMode] = useState(null);

  const handleLocalPlay = () => {
    setSelectedMode("local");
  };

  return (
    <div className="game-setup-page">

      {!selectedMode && (
        <ModeSelector
          onLocalPlay={handleLocalPlay}
        />
      )}

      {selectedMode === "local" && (
        <PlayerSelector />
      )}

    </div>
  );
}

export default GameSetup;