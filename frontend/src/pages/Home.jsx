import React, { useState } from 'react'
import { styled } from 'styled-components';
import axios from "axios";
import ViewDetails from '../components/ViewDetails';


const Home = () => {
  const TableComponent = ({ serverData }) => {
    const generateTableRows = (data) => {
      return data.map(item => (
        <Tr key={item.item.id}>
          <Id>{item.item.id}</Id>
          <Book>{item.item.book_name}</Book>
          <Author>{item.item.author_name}</Author>
          <Takeaway>{item.item.key_takeaways}</Takeaway>
          
        </Tr>
      ));
    };
    if(serverData.length===0){
      return(
        <div>
          PLEASE SEARCH THE BOOK NAME
        </div>
      )
    }
    return (
      <Table>
        <TableHeader>
          <Tr>
            <ID>ID</ID>
            <BookName>Book Name</BookName>
            <AuthorName>Author Name</AuthorName>
            <KeyTakeaway>Key Takeaways</KeyTakeaway>
            <th>tags</th>
          </Tr>
        </TableHeader>
        <Tbody>
          {generateTableRows(serverData)}
        </Tbody>
      </Table>
    );
  };

  const [text, setText] = useState('');
  const [responseText, setResponseText] = useState([]);

  const submitForm = () => {
    axios.get(`http://localhost:8000/api/lib/getByName/${text}`)
      .then(response => {
        console.log(response.data);
        setResponseText(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitForm();
    }
  };
  return (
      <Wrapper>
      <Container>
      <Search>
        <form action="" onSubmit={(e)=>e.preventDefault()}>
          <Input type="text" id="textInput" placeholder="Search for a book" value={text} onChange={(event) => { setText(event.target.value) }} onKeyDown={handleKeyPress} />
        </form>
      </Search>
      <Output>
        <TableComponent serverData={responseText} />
      </Output>
    <ViewDetails/>
    </Container>
    </Wrapper>
  )
};

const Container = styled.div`
    flex: 1;
    background-color: #C8E4B2;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    
`;

const Wrapper = styled.div`
   display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Search = styled.div`
display: grid;
width: 95%;
`;

const Input = styled.input`
  border: 2px transparent solid;
  outline: none;
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.1);
  outline: none;
  padding: 15px 32px;
  border-radius: 15px;
  border: 2px rgb(255, 255, 255) solid;
  width: 92%;
  &:focus{
    box-shadow: 0px 0px 16px #FFD9B7;
  }
  &:focus-within{
    background: #fff;
    border: 2px #FFD9B7 solid;
  }
  &::placeholder{
    color:#7EAA92 ;
  }
`;


const Output = styled.div`
    margin-top: 20px;
    font-size: 18px;
    height: 70vh;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Table = styled.div`
  background-color:#FFD9B7 ;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableHeader = styled.thead`
  background-color: #caab91;
  width: 100%;
`;


const ID = styled.th`
  width: 2%;
  `;

const BookName = styled.th`
width: 15%;

`;

const AuthorName = styled.th`
width: 10%;

`;

const KeyTakeaway = styled.th`
width: 35%;

`;

const Tr = styled.tr`
  width: 100%;
  display: flex;
`;

const Tbody = styled.tbody`
  width: 100%;
  text-align: center;
`;

const Id = styled.td`
  border-bottom: 1px solid #bebebe;
  height: 50px;
  width: 2%;
`;

const Book = styled.td`
border-bottom: 1px solid #bebebe;
  height: 50px;
  width: 15%;
`;

const Author = styled.td`
border-bottom: 1px solid #bebebe;
  height: 50px;
  width: 10%;
`;

const Takeaway = styled.td`
border-bottom: 1px solid #bebebe;
  height: 50px;
  width: 35%;
`;


export default Home
