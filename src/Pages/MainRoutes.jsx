import { Stack } from "@chakra-ui/react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ReqAuth } from "../Components/ReqAuth";
import { HomePage } from "./HomePage";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Sidebar } from "./../Components/Sidebar";
import { EditPage } from "./EditPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar />
              <HomePage />
            </Stack>
          </ReqAuth>
        }
      />
      <Route
        path="/task/:id"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar />
              <EditPage />
            </Stack>
          </ReqAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
