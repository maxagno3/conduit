import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "../index.css";
import AuthHeader from "./AuthHeader";
import Error from "./Error";
import Home from "./Home";
import Login from "./Login";
import NonAuthHeader from "./NonAuthHeader";
import Register from "./Register";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    Axios.get(" https://mighty-oasis-08080.herokuapp.com/api/user", {
      headers: { authorization: ` Token ${localStorage.getItem("authToken")}` },
    })
      .then(({ data: { user } }) => {
        setIsLoggedIn(true);
        setUserInfo(user);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {isLoggedIn ? <AuthHeader userInfo={userInfo} /> : <NonAuthHeader />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
