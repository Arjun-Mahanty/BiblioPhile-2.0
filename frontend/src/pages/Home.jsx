import React from 'react'
import image from "../assets/library.jpg"
import styled,{keyframes} from 'styled-components';


const Home = () => {
  return (
    <Container>
      <Intro>

<svg width="100%" height="100%">
 <Text x="50%" y="100%"  text-anchor="middle"  >
   BIBLIOPHILE
 </Text>
 </svg>
 <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nisi ut perferendis atque! Porro officia optio eos itaque tempore eaque fugiat? Aut, sunt maiores. Libero error dolor incidunt eaque adipisci.</P>
      </Intro>
      <Card>
      <Image src={image} alt="" />
      <Details>
        {/* <Heading>BIBLIOPHILE</Heading> */}
      
      </Details>
      </Card>
    </Container>
  )
};

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Image = styled.img`
border-radius: 5px;
height: 95%;
margin-left: 15px;
`

const Card = styled.div`
padding: 15px;
border-radius: 15px;
width: 90%;
height: 80vh;
display: flex;
align-items: center;
background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.5));

`;

const Intro = styled.div`
  width: 100%;
  height: 50vh;
  margin-bottom: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const textAnimate = keyframes`
   0% {
    stroke-dasharray: 0 50%;
    stroke-dashoffset:  20%;
    fill:hsl(0,0%, 100%)

  }
  
  100% {
    stroke-dasharray: 50% 0;
    stroke-dashoffstet: -20%;
    fill:hsl(0,0%, 100%)
  }
`

const Text = styled.text`
  font-family: Lora;
  color: white !important;
  letter-spacing: 10px;
  stroke: black;
  font-size: 200px;
  font-weight: 700;
  stroke-width: 3;
  /* animation: ${textAnimate} 5s ease-in-out alternate; */
`

const Details = styled.div`
  height: 100%;
`
const P = styled.p`
  
`

const Heading = styled.h1`
font-size: 200px;
color: white;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export default Home
