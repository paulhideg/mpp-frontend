import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ProtectedRoutes() {
  const token = cookies.get("TOKEN");
  if (!token) alert("Login first to access this resource");
  return <Fragment>{token ? <Outlet /> : <Navigate to="/" />}</Fragment>;
}
