import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { auth } = useAuth();
  return (
    <main>
      {auth?.user_name && <NavBar />}{" "}
      {/* Render NavBar only if the user is logged in */}
      <Outlet />
    </main>
  );
};

export default Layout;
