import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Authenthicaction from "./components/Authenthicaction";
import Home from "./components/Home";
import Navmenu from "./components/Navmenu";
import { useAuthApi } from "./context/AuthContext";

const App = () => {
  const { registerNewUser, loginUser, logoutUser, user } = useAuthApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ error: false, msg: "" });
  const navigate = useNavigate();

  const handleRegisterNewUser = async (event) => {
    event.preventDefault();
    setError("");

    // validate form
    if (email === "" || password === "") {
      return setError({ error: true, msg: "Please check the missing field" });
    }

    // register user
    try {
      await registerNewUser(email, password);
      navigate("/home");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }
  };

  // handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (email === "" || password === "") {
      return setError({ error: true, mag: "missing field" });
    }

    try {
      await loginUser(email, password);
      navigate("/home");
    } catch (err) {
      setError({ error: true, msg: err.code });
    }
  };

  const [taskId, setTaskId] = useState("");

  const getId = (id) => {
    setTaskId(id);
    console.log(taskId);
  };

  return (
    <>
      <Navmenu />
      <Routes>
        <Route
          path="/"
          element={
            <Authenthicaction
              fx={handleLogin}
              email={email}
              password={password}
              title="Login"
              setEmail={setEmail}
              setPassword={setPassword}
              err={error}
              setErr={setError}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Authenthicaction
              fx={handleRegisterNewUser}
              title="Sign up"
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              err={error}
              setErr={setError}
            />
          }
        />
        <Route
          path="/home"
          element={<Home user={user} taskId={taskId} setId={getId} />}
        />
      </Routes>
    </>
  );
};

export default App;
