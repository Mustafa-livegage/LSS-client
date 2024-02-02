import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles.css";
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
import AddWaterfall from "./screens/AddWaterfall";
import Payment from "./screens/Payment";
import Users from "./screens/Users";

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

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.USER} />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/addloans" element={<SingleEntryForm />} />
          <Route exact path="/loan-details/:id" element={<Details />} />
          <Route exact path="/payment/:id" element={<Payment />} />
          <Route
            exact
            path="/payment-schedule-details/:id"
            element={<Schedule />}
          />
        </Route>
        <Route element={<RequireAuth allowedRoles={ROLES.ADMIN} />}>
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/escrow-master" element={<EscrowMaster />} />
          <Route exact path="/addwaterfall" element={<AddWaterfall />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
