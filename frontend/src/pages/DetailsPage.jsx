import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from "styled-components";

const DetailsPage = () => {
  const { bookName } = useParams();
  const [content, setContent] = useState([]);
  const chatRef = useRef(null);
  const searchData = {
    bookName: bookName
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.elements.prompt.value;
    e.target.reset()
    setContent(prevContent => [...prevContent, { text: prompt, isAi: false }]);
    chatRef.current.scrollIntoView({ behavior: 'smooth' });
    axios.post('http://localhost:8000/gpt/q', { prompt: prompt })
      .then(res => {
        console.log(res.data);
        setContent(prevContent => [...prevContent,res.data]);
      })
      .catch(err => {
        console.log(err)
      })
  }

  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const [response, setResponse] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/lib/getDetails`, { params: searchData })
      .then(response => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    axios.post('http://localhost:8000/gpt/init',{params:searchData})
    .then(res=>{
      console.log('gpt ready')
    })
    .catch(err=>{
      console.log(err);
    })
  }, [bookName]);

  return (
    <div>
      {response.length > 0 ? (
        <div>
          <div>
            <h1>{response[0].book_name}</h1>
            <h2>{response[0].author_name}</h2>
            {response[0].tags.map((tag) => (
              <div>{tag}</div>
            ))}
            <img src={response[0].book_image_link} alt="" />
            <p>{response[0].summary}</p>
          </div>
          <div ref={chatRef}>
            <div>
              {content.map((element, index) => (
                <Stripe key={index} isAi={element.isAi} id={generateUniqueId}>{element.text}</Stripe>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <TextArea name="prompt" cols="1" rows="1" placeholder='Ask any doubt...'></TextArea>
              <button type='submit'>send</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
};

const Stripe = styled.div`
  background-color:${(props) => (props.isAi ? '#ffd9b7' : '#caab91')};
`;

const TextArea = styled.textarea`
width: 100%;
font-size: 18px;

padding: 10px;
background: transparent;
border-radius: 5px;
border: none;
outline: none;
`

export default DetailsPage


