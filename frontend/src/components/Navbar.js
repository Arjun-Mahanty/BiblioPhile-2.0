import React from 'react'
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container>
      <Heading><Span>B</Span>ibliophile</Heading>
      <Links>
        <L to='/'>Home</L>
        <L to='/books'>Books</L>
        <L to='/about'>About</L>
      </Links>
    </Container>
  )
};

const Container = styled.div`
    /* background-color: #7EAA92; */
    color: #fff;
    padding: 20px 0;
    margin-bottom: 10px;
    font-size: 36px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
`;

const Heading = styled.div`
margin-left: 20px;
`;

const Links = styled.div`
margin-right: 50px;
`;

const L = styled(NavLink)`
  margin-left: 10px;
  text-decoration: none;
  color: #333333;
  font-size: 24px;
  &.active{
    color: white;
  }
`;

const Span = styled.span`
color: #333333;
`;


export default Navbar
