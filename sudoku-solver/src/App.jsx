import { useState } from "react";

import Grid from "./components/Grid";

function App() {
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    setSolved(true);
  };

  const handleRefresh = () => {
    setSolved(false);
  };

  return (
    <>
      <Grid
        solve={solved}
        handleSolve={handleSolve}
        handleRefresh={handleRefresh}
      />
      <div className="btn-container">
        <button className="btn" onClick={handleSolve}>
          SOLVE
        </button>
      </div>
    </>
  );
}

export default App;
