import React from "react";
import { Routes, Route } from "react-router-dom";
import Details from "../screens/Details";
import Schedule from "../screens/Schedule";
import HomePage from "../screens/HomePage";
import SingleEntryForm from "../screens/SingleEntryForm";
import EscrowMaster from "../screens/EscrowMaster";
import AddUser from "../screens/AddUser";
import Login from "../screens/Login";
import Unauthorized from "../screens/Unauthorized";
import RequireAuth from "../components/RequireAuth";
import Payment from "../screens/Payment";
import Users from "../screens/Users";
import WaterfallDetails from "../screens/WaterfallDetails";
import Layout from "../components/Layout";

export const ROLES = {
  ADMIN: "admin",
  USER: "servicer",
};

const RouteHandler = () => {
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
          <Route
            exact
            path="/waterfall-details"
            element={<WaterfallDetails />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteHandler;
