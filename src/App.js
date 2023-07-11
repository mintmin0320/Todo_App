import { BrowserRouter as Router } from "react-router-dom";

import MainRouter from './router/MainRouter';

function App() {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

export default App;
