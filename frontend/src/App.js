import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AddModel from "./components/main/AddModel";
import Login from "./components/main/Login";
import ModelBrowser from "./components/main/ModelBrowser";
import Signup from "./components/main/Signup";
import UserBrowser from "./components/main/UserBrowser";
import ViewModel from "./components/main/viewModel";
import { AppProvider } from "./AppContext";
import { useState } from "react";
import Authorisor from "./components/main/Auth";
import Main from "./components/main";
function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  return (
    <div>
      <AppProvider currentUser={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route element={<Main></Main>} path="main">
              <Route element={<Signup></Signup>} path="signup" />
              <Route element={<Login />} path="login" />
              <Route element={<UserBrowser />} path="userbrowser" />
              {/* <Route element={<AddModel></AddModel>} path="addmodel" /> */}
              {/* <Route element={<ModelBrowser />} path="modelbrowser" /> */}
              <Route
                element={
                  <Authorisor>
                    <ModelBrowser />
                  </Authorisor>
                }
                path="modelbrowser"
              />
              <Route
                element={
                  <Authorisor>
                    <AddModel></AddModel>
                  </Authorisor>
                }
                path="addmodel"
              />
              <Route element={<ViewModel />} path="viewer/:id" />
            </Route>
            <Route element={<Navigate to="/home" />} path="/" />
            <Route element={<Home></Home>} path="home" />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
