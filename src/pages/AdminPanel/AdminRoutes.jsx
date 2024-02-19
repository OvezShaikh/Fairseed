import React from "react";
import { Route, Routes } from "react-router-dom";
import General from "../../components/AdminPanelPages/General_Setting/General/Index";
import Limit from "../../components/AdminPanelPages/General_Setting/Limit/Index";
import ProfilesSocial from "../../components/AdminPanelPages/General_Setting/ProfilesSocial/Index";
import CauseEdit from "../../components/AdminPanelPages/CauseEditApprovel/Index";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/General"
        element={
          <General />
        }
      />
      <Route
        path="/Limits"
        element={
          <Limit />
        }
      />
      <Route
        path="/Profiles-Social"
        element={
          <ProfilesSocial />
        }
      />
       <Route
    path="/Edit"
    element={
        <CauseEdit/>
    }
  />
    </Routes>
  );
}

export default AdminRoutes;
