import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './button'

const RulesStyled = styled.div`
  text-align: center;
  &::before {
    content: '';
    display: ${({ visible }) => visible ? 'block' : 'none'};
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.6);
  }
  .close-button {
    margin-top: 2em;
    cursor: pointer;
  }

  .rules-modal {
    background: white;
    padding: 4em 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    h2 {
      color: #3B4262;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: -2px;
      margin-bottom: 1em;
    }

  }
  @media screen and (min-width: 768px) {
    .button {
      position: fixed;
      right: 12em;
      bottom: 2em;
    }
    .rules-modal {
      width: 400px;
      margin: auto;
      border-radius: 10px;
      top: -20%;
      bottom: initial;
      transform: translateY(50%);
      padding: 2em;
      box-sizing: border-box;
      h2 {
        font-size: 32px;
        align-self: flex-start;
        margin: 0 0 1.2em 0;
      }
    }
    .close-button {
      position: absolute;
      right: 2em;
      top: .8em;
    }
  }
`

function Endgame() {
  const [visible] = useState(false)
  function handleToggleClick() {
    
    window.location.reload()
  }
  return (
    <RulesStyled visible={visible}>
      <Button onClick={handleToggleClick} className="button">
        End Game
      </Button>
    </RulesStyled>
  )
}

export default Endgame