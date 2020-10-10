import Axios from "axios";
import { Formik } from "formik";
import React from "react";

function validationLogic(values) {
  const errors = {};
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }
  return errors;
}

function Login(props) {
  return (
    <div className="contact-panel container" id="contact-panel">
      <h2 className="contact-panel-button">Login</h2>
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validationLogic}
          onSubmit={(values, { setSubmitting }) => {
            Axios.post(
              "https://mighty-oasis-08080.herokuapp.com/api/users/login",
              {
                user: values,
              }
            )
              .then((res) => {
                localStorage.setItem("authToken", res.data.user.token);
                props.history.push("/");
              })
              .catch((error) => props.history.push("/login"));
            setSubmitting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <label>
                  E-mail *
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <small>{errors?.email}</small>
              <div className="row">
                <label>
                  Password *
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <small>{errors?.password}</small>
              <div className="contact-panel-actions">
                <button type="submit" className="button submit-button">
                  Log In
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
