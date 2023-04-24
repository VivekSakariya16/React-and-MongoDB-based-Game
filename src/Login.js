import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(0);
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);
  const host = "http://localhost:8080";
  const[l_username, setL_username] = useState(0);
  const[l_password, setL_password] = useState(0);

  const signup = async (e) => {
    e.preventDefault();
    if(username === 0 || email === 0 || password === 0){
      alert("Please fill all the fields");
      return;
    }
    await fetch(host + "/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    }).then(() =>{
      alert("User added");
    }
    )
    console.log("Welcome to home");
  };
 
  const login = async (e) => {
    e.preventDefault();
    await fetch(host + "/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: l_username,
        password: l_password,
      }),
    }).then((res) =>{
      if(res.status === 200){
        localStorage.setItem("username", l_username);
        navigate('/home')
      }
      else{
        alert("Invalid credentials");
      }
    }
    ).catch((err) => {
      console.log(err);
    })
    console.log("Welcome to home");
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    // return () => {
    //   signUpButton.removeEventListener("click");
    //   signInButton.removeEventListener("click");
    // };
  }, []);

  return (
    <>
      <h2>Welcome to Rock Paper Scissors!</h2>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FaGoogle />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input type="email" placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input type="password" placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={(e) => signup(e)}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <FaGoogle />
              </a>
            </div>
            <span>or use your account</span>
            <input type="text" placeholder="Username" 
              onChange={(e) => setL_username(e.target.value)}
              required
            />
            <input type="password" placeholder="Password" 
              onChange={(e) => setL_password(e.target.value)}
              required
            />
            <button onClick={(e) => login(e)}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details to continue playing Rock Paper Scissors</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;