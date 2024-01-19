import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.css";
import RouteHandler from "./Routes/RouteHandler";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <RouteHandler />
      </Router>
    </>
  );
}

export default App;
