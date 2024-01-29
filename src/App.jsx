import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles.css";
import RouteHandler from "./Routes/RouteHandler";
import Login from "./screens/Login";
import Layout from "./components/Layout";
import HomePage from "./screens/HomePage";
import Schedule from "./screens/Schedule";
import SingleEntryForm from "./screens/SingleEntryForm";
import AddUser from "./screens/AddUser";
import Details from "./screens/Details";
import EscrowMaster from "./screens/EscrowMaster";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./screens/Unauthorized";

export const ROLES = {
  ADMIN: "admin",
  USER: "servicer",
};

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        {/* public routes */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/unauthorized" element={<Unauthorized />} />
        <Route exact path="/adduser" element={<AddUser />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.USER} />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/escrow-master" element={<EscrowMaster />} />
          <Route exact path="/addloans" element={<SingleEntryForm />} />
          <Route exact path="/loan-details/:id" element={<Details />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={ROLES.ADMIN} />}>
          <Route
            exact
            path="/payment-schedule-details/:id"
            element={<Schedule />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
