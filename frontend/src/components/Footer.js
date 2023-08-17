import React from 'react'
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <FooterDiv>
      &copy; 2023 Bibliophile. All rights reserved.
    </FooterDiv>
  )
};

const FooterDiv = styled.div`
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
`;

export default Footer
