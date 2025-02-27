import React from "react";
import axios from "axios"; // Import axios
import "./LoginSignUp.css";
import { useState } from "react";
import password from "../Assets/password.png";
import email from "../Assets/email.png";
import person from "../Assets/person.png";
import { useNavigate } from "react-router-dom";
const LoginSignUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmitSignUp = async (evt) => {
    evt.preventDefault();

    const { username, email, password } = state;

    try {
      const response = await axios.post("http://localhost:8080/api/SignUp", {
        username,
        email,
        password,
      });

      if (response.status == 200) {
        alert("SignUp Successfull");

        setState({
          username: "",
          email: "",
          password: "",
        });

        // navigate("/login");
      }
    } catch (error) {
      alert("SignUp Failed. Please try again");
    }
  };

  const handleOnSubmitLogin = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    // Send login request to the server
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userEmail", email);
        setState({ email: "", password: "" });
      }

      if (response.ok) {
        alert("Login successful!");
      }

      navigate("/home");
    } catch (error) {
      alert("Either Password or email is wrong.");
    }

    // Clear the form fields
    setState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={person} alt="" />
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
        )}
        <div className="input">
          <img src={email} alt="" />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Your email"
          />
        </div>
        <div className="input">
          <img src={password} alt="" />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Your password"
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password? <span>Click here</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={
            action === "Sign Up"
              ? handleOnSubmitSignUp
              : () => setAction("Sign Up")
          }
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={
            action === "Login" ? handleOnSubmitLogin : () => setAction("Login")
          }
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
