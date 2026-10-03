import "./ModeSelector.css";
import modeIcon1 from "../../assets/gameselectoricon.png";
function ModeSelector({ onLocalPlay }) {
  return (
    <section className="mode-selector">
      <div className="mode-heading">
        <h1>Choose Your Game Mode</h1>
        <p>Select how you want to play Ludo.</p>
      </div>

      <div className="mode-cards">
        {/* Card 1 */}
        <div className="mode-card">
          <div className="mode-icon">
            <img src={modeIcon1} alt="Local Multiplayer" />
          </div>
          <h2>Local Multiplayer</h2>
          <p>Play with friends on the same device.</p>
          <button className="mode-btn" onClick={onLocalPlay}>
  Play
</button>
        </div>

        {/* Card 2 */}
        <div className="mode-card">
          <div className="mode-icon">
            <img src={modeIcon1} alt="Play vs Computer" />
          </div>
          <h2>Play vs Computer</h2>
          <p>Challenge the computer AI and test your skills.</p>
          <button className="mode-btn">Play</button>
        </div>

        {/* Card 3 */}
        <div className="mode-card">
          <div className="mode-icon">
            <img src={modeIcon1} alt="Online Multiplayer" />
          </div>
          <h2>Online Multiplayer</h2>
          <p>Play with players online from around the world.</p>
          <button className="mode-btn">Play</button>
        </div>
      </div>
    </section>
  );
}

export default ModeSelector;