import React, { useState } from 'react'
import { styled } from 'styled-components';
import axios from "axios";


const Home = () => {
    const TableComponent = ({ serverData }) => {
        const generateTableRows = (data) => {
          return data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.book_name}</td>
              <td>{item.author_name}</td>
              <td>{item.key_takeaways}</td>
            </tr>
          ));
        };
      
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Key Takeaways</th>
              </tr>
            </thead>
            <tbody>
              {generateTableRows(serverData)}
            </tbody>
          </table>
        );
      };

    const [text,setText] = useState('');
    const [responseText, setResponseText] = useState([]);

    const handleSubmit = (event)=>{
      event.preventDefault();
      axios.get(`http://localhost:8000/api/lib/getByName/${text}`)
            .then(response=>{
                console.log(response.data);
                setResponseText(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
              });
    }
  return (
    <Container>
      <form action="" onSubmit={handleSubmit}>
      <Input type="text" id="textInput" placeholder="Search for a book" value={text} onChange={(event)=>{setText(event.target.value)}}/>
      <Button id="submitButton" type='submit'>Submit</Button>
      </form>
      <Output id="output">
        <TableComponent serverData={responseText}/>
      </Output>
    </Container>
  )
};

const Container = styled.div`
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Georgia', serif;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: #45a049;
    }
`;

const Output = styled.div`
    margin-top: 20px;
    font-size: 18px;
`;

export default Home
