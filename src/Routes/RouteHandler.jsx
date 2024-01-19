import React from "react";
import { Routes, Route } from "react-router-dom";
import Details from "../screens/Details";
import PaymentScheduler from "../screens/PaymentScheduler";
import HomePage from "../screens/HomePage";
import SingleEntryForm from "../screens/SingleEntryForm";

const RouteHandler = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route
        exact
        path="/payment-schedule-details/:id"
        element={<PaymentScheduler />}
      />
      <Route exact path="/addloans" element={<SingleEntryForm />} />
      <Route exact path="/loan-details/:id" element={<Details />} />
    </Routes>
  );
};

export default RouteHandler;
