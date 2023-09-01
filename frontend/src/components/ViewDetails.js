import React from 'react'
import { styled } from 'styled-components';
import {NavLink} from 'react-router-dom';

const ViewDetails = () => {
  return (
    <Wrapper>
      <Button><NavLink>View Details</NavLink></Button>
    </Wrapper>
  )
}


const Wrapper = styled.div`
position: relative;
width: 200px;
height: 200px;
`;

const Button = styled.button`
background-color: white;
border: none;
  `;

export default ViewDetails
