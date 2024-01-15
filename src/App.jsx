import Navbar from "./components/Navbar";
import SingleEntryForm from "./screens/SingleEntryForm";
import HomePage from "./screens/HomePage";

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Details from "./screens/Details";
import "./styles.css";
import BackButton from "./components/BackButton";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* {location.pathname !== "/" && (
          <BackButton />
        )} */}
        
        {/* {location.pathname !== "/" && <BackButton />} */}
        
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
