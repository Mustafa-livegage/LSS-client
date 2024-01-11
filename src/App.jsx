import Navbar from "./components/Navbar/Navbar";
import SingleEntryForm from "./screens/SingleEntryForm/SingleEntryForm";
import HomePage from "./screens/HomePage/HomePage";

import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/addloans" element={<SingleEntryForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
