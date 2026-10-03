import "./Token.css";

function Token({
  color = "green",
  tokenNumber,
  isSelected = false,
  isMovable = false,
  onClick,
}) {
  const handleClick = () => {
    if (!isMovable) return;

    if (typeof onClick === "function") {
      onClick(tokenNumber);
    }
  };

  return (
    <button
      type="button"
      className={`ludo-token token-${color} ${
        isSelected ? "token-selected" : ""
      } ${isMovable ? "token-movable" : ""}`}
      onClick={handleClick}
      disabled={!isMovable}
      aria-label={`${color} token ${tokenNumber}`}
    >
      <span className="token-number">{tokenNumber}</span>
    </button>
  );
}

export default Token;