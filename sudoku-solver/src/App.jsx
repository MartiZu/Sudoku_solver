import { useState } from "react";

import Grid from "./components/Grid";

function App() {
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    setSolved(true);
  };

  return (
    <>
      <Grid solve={solved} handleSolve={handleSolve} setSolved={setSolved} />
    </>
  );
}

export default App;
