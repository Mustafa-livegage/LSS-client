import Navbar from "./components/Navbar/Navbar";
import SingleEntryForm from "./screens/SingleEntryForm";
import HomePage from "./screens/HomePage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./screens/Details";
import "./styles.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/addloans" element={<SingleEntryForm />} />
          <Route exact path="/loan-details/:id" element={<Details />} />
        </Routes>
      </Router>
      {/* <Details/> */}
    </>
  );
}

export default App;
