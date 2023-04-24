import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";

const Record = styled.main`
  background-image: radial-gradient(circle at top, #13366c 20%, #131537 100%);
  font-family: "Barlow Semi Condensed", sans-serif;
  width: 100vw;
  height: 100vh;

  body {
    align-items: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    height: 100vh;
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

  .app-content {
    padding: 2em;
    min-height: 100vh;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
  }

  .show{
    position: fixed;
    bottom: 3%;
    left: 87%;
    color: #fff;
  }
  .show:hover {
    color: #13366c;
  }

  .scoreboard {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border-radius: 10px;
    padding: 2em;
  }
  
  .scoreboard h1 {
    font-size: 40px;
    text-align: center;
    color: #fff;
    margin-bottom: 15px;
    margin-top:55px;
  }
  
  .scoreboard table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .scoreboard th {
    color: #13366c;
    padding: 10px;
    text-align: center;
    border: 2px solid white;
    font-size: 20px;
    background-color: #fff;
    width: 200px;
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
function Allrecord() {
  const host = "http://localhost:8080";
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScores() {
      const response = await axios.get(host + '/get-all-scores');
      setScores(response.data);
    }
    fetchScores();
  }, []);

  function handleClick() {
    navigate("/home");
  }

  return (
    <Record>
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

          {scores.map((score, i) => (
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
        <Button onClick={() => handleClick()}>close</Button>
      </div>
    </Record>
  )
}

export default Allrecord;