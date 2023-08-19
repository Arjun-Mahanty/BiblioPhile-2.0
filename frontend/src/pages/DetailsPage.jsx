import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SVG from "./reshot-icon-right-arrow-YSCZ76U4B2.svg"

const DetailsPage = () => {
    const {bookName} = useParams();
    const searchData = {
        bookName:bookName
    }
    const [response,setResponse] = useState([]);
    useEffect(()=>{
       axios.get(`http://localhost:8000/api/lib/getDetails`,{params:searchData})
      .then(response => {
        console.log(response.data);
        setResponse(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });  
    },[bookName])
        return (
          <div>
            {response.length > 0 ? (
                <div>
                    <div>
                    <h1>{response[0].book_name}</h1>
                    <h2>{response[0].author_name}</h2>
                    {response[0].tags.map((tag)=>(
                        <div>{tag}</div>
                        ))}
                    <img src={response[0].book_image_link} alt="" />
                    <p>{response[0].summary}</p>
                    </div>
                    <div>
                        <div>

                        </div>
                        <form>
                          <textarea name="prompt"  cols="1" rows="1" placeholder='Ask any doubt...'></textarea>
                          <button type='submit'><img src={SVG} alt="" /></button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
          </div>
        )
}

export default DetailsPage
