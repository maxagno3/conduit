import Axios from "axios";
import { Formik } from "formik";
import React from "react";

function validationError(values) {
  const errors = {};
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.username.length < 6) {
    errors.username = "Username must be atleast 6 characters long";
  }

  if (!values.password) {
    errors.password = "Password cannot be empty";
  } else if (values.password.length < 6) {
    errors.password = "Password must be atleast 6 characters long.";
  } else if (!/[^a-z\d]/i.test(values.password)) {
    return (errors.password = "Password must contain a letter and a number");
  }

  return errors;
}

function Register(props) {
  return (
    <div className="callout primary container">
      <div className="form-icons">
        <h4>Register for an account</h4>
        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          validate={validationError}
          onSubmit={(values, { setSubmitting }) => {
            // Post the data to server.
            Axios.post("https://mighty-oasis-08080.herokuapp.com/api/users", {
              user: values,
            })
              .then((res) => props.history.push("/login"))
              .catch((err) => console.log(err, "error"));

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
              <div className="input-group">
                <span className="input-group-label">
                  <i className="fa fa-envelope"></i>
                </span>
                <input
                  className="input-group-field"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <small className="error">{errors?.email}</small>

              <div className="input-group">
                <span className="input-group-label"></span>
                <i className="fa fa-key"></i>
                <input
                  className="input-group-field"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <small className="error">{errors?.password}</small>

              <div className="input-group">
                <span className="input-group-label">
                  <i className="fa fa-user"></i>
                </span>
                <input
                  className="input-group-field"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <small className="error">{errors?.username}</small>
              <button type="submit" className="button expanded">
                Sign Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
