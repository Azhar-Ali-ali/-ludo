import "./LudoCell.css";

function LudoCell({
  row,
  col,
  cellType,
  color,
  isSafe,
  isStart,
  children,
  onClick,
}) {
  const className = [
    "ludo-cell",
    `cell-${cellType}`,
    color ? `cell-color-${color}` : "",
    isSafe ? "cell-safe" : "",
    isStart ? "cell-start" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      data-row={row}
      data-col={col}
      onClick={onClick}
    >
      {isSafe && <span className="safe-star">★</span>}

      {children}
    </div>
  );
}

export default LudoCell;