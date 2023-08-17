import React from 'react';
import styled from 'styled-components'

const Header = () => {
  return (
    <div>
      <Heading>Bibliophile</Heading>
    </div>
  )
};

const Heading = styled.h1`
    background-color: #7EAA92;
    color: #fff;
    padding: 20px 0;
    text-align: center;
    margin-bottom: 10px;
    font-size: 36px;
    width: 100vw;
`;

export default Header
