import React from 'react'
import { styled,keyframes } from 'styled-components'

const ViewDetails = () => {
  return (
    <Wrapper>
      <Button></Button>
    </Wrapper>
  )
}

const spin = keyframes`
  100%{
    transform: rotate(-360deg);
  }
`;

const Wrapper = styled.div`
position: relative;
width: 200px;
height: 200px;
`;

const Button = styled.button`
  height: 40px;
  width: 100px;
  border-radius: 5px;
  box-shadow: 0 20px 35px rgba(0,0,0,0.3);
  overflow: hidden;
  position: absolute;
  &:before{
    content: "";
    height:375%;
    width: 150%;
    position: absolute;
    left: -25%;
    top:-135%;
    background:conic-gradient(
      #fd004c,
      #fe9000,
      #fff020,
      #3edf4b,
      #3363ff,
      #b102b7,
      #fd004c
    );
    animation:${spin} 1.5s infinite linear ;
  }
  &:after{
    position: absolute;
    content: "View Details";
    background-color: black;
    color: white;
    
    height: 80%;
    width:90%;
    top:5.5%;
    left:3.5%;
    display: grid;
    place-items:center;
    border-radius:5px;
    border: 1px solid black;
  }
`;

export default ViewDetails
