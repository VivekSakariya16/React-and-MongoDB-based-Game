import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const HomeStyled = styled.main`
  background-image: radial-gradient(circle at top, #13366c 20%, #131537 100%);
  font-family: "Barlow Semi Condensed", sans-serif;
  width: 100vw;

  body {
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    color: #13366c;
    background-color: #7e57c2;
  }

  .Wrapper {
    max-width: 100%;
  }

  .Title {
    color: #fff;
    font-size: 50px;
    text-align: center;
  }

  .Input {
    position: relative;
    display: flex;
    justify-content: center; 
  }
  
  .Input-text {
    display: block;
    color: #000;
    width: 50%;
    height: 50px;
    font-family: inherit;
    font-size: 25px;
    text-align: center;
    font-weight: inherit;
    line-height: 25px;
    border: none;
    border-radius: 0.4rem;
    transition: box-shadow;
  }

  .Input-text::placeholder {
    color: #b0bec5;
  }

  .Input-text:focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem;
  }

  .Input-text:placeholder-shown + .Input-label {
    visibility: hidden;
    z-index: -1;
  }

  .Input-text:not(:placeholder-shown) + .Input-label,
  .Input-text:focus:not(:placeholder-shown) + .Input-label {
    visibility: visible;
    z-index: 1;
    opacity: 1;
    transform: translate3d(0, var(--labelTransformedPosY), 0)
      scale(var(--labelScaleFactor));
    transition: transform var(--inputTransitionDuration), visibility 0ms,
      z-index 0ms;
  }

  .app-content {
    padding: 2em;
    min-height: 100vh;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
  }

  .start-button:hover {
    color: #13366c;
  }
  .start-button {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    color: #fff;
    font-size: 24px;
    padding: 16px 32px;
  }

  .show{
    position: fixed;
    bottom: 3%;
    right: 13%;
    color: #fff;
  }
  .show:hover {
    color: #13366c;
  }

  .h1 {
    top: 30%;
    left: 50%;
    font-size: 50 px;
    line-height: 1.2;
    font-weight: 700;
    margin: auto;
    text-transform: uppercase;
    text-align: center;
  }

  .scoreboard {
    background-color: transparent;
    border-radius: 10px;
    padding: 10px;
    width: 55%;
    max-width: 100%;
    position: fixed;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .scoreboard h1 {
    font-size: 40px;
    text-align: center;
    color: #fff;
    padding-bottom: 15px;
  }

  .scoreboard table {
    width: 100%;
    border-collapse: collapse;
  }
  .scoreboard th{
    color: #13366c;
    padding: 10px;
    text-align: center;
    border: 2px solid white;
    font-size: 20px;
    background-color: #fff;
  }
  .scoreboard td {
    padding: 10px;
    text-align: center;
    border: 2px solid white;
    font-size: 20px;
    color: #fff;
  }

  .scoreboard td:first-child {
    font-weight: bold;
  }

  .scoreboard td:nth-child(2) {
    text-align: center;
  }

  .scoreboard tr:last-child td {
    border-bottom: none;
  }
`;

function Home() {
  const host = "http://localhost:8080";
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScores() {
      const response = await axios.get(host + '/get-scores');
      setScores(response.data);
    }
    fetchScores();
  }, []);

  function handleClick() {
    navigate("/play");
  }
  function all() {
    navigate("/allrecord");
  }


  return (
    <HomeStyled>
      <div className="app-content">
        <div class="Wrapper">
          <h1 class="Title">Welcome to Rock-Paper-Scissor!</h1>
        </div>
        <div className="start-button">
          <Button onClick={handleClick} className="start-button">
            <b>Start!</b>
          </Button>
        </div>
        <div class="scoreboard">
          <h1>Scoreboard</h1>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>

            {scores.filter((score) => score.name === localStorage.getItem("username")).map((score, i) => (
              <>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                  </tr>
                  <tr></tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
        <div className="show">
          <Button onClick={() => all()}>show more></Button>
        </div>
      </div>
    </HomeStyled>
  );
}

export default Home;