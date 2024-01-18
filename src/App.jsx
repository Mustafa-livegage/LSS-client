import Navbar from "./components/Navbar";
import SingleEntryForm from "./screens/SingleEntryForm";
import HomePage from "./screens/HomePage";
import TempScreen from "./screens/TempScreen";
import PaymentScheduler from "./screens/PaymentScheduler";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Details from "./screens/Details";
import "./styles.css";
import BackButton from "./components/BackButton";
import PaymentSched from "./components/PaymentSchedule";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/" element={<TempScreen />} /> */}
          <Route exact path ="/payment-schedule-details/:id" element={<PaymentScheduler />}/>
          <Route exact path="/addloans" element={<SingleEntryForm />} />
          <Route exact path="/loan-details/:id" element={<Details />} />
          {/* <Route exact path="/payment_schedule" element={<PaymentSchedule />} /> */}
        </Routes>
      </Router>
      {/* <Details/> */}
    </>
  );
}

export default App;
