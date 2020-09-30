import React, { useState, useEffect, Fragment} from 'react';
//import logo from './logo.svg';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const [fetchData,setFetchData] = useState(null)
  const [userInput,setUserInput] =useState("")
  const [userQuery,setUserQuery] =useState("")
  

  useEffect(
    () => { 
      const url = `http://hn.algolia.com/api/v1/search?query=${userQuery}`
      console.log(url)
      fetch(url)
      .then(res => res.json())
      .then(data=>setFetchData(data))
      }
    ,[userQuery]) 

    //onChange: anonymous function (e)=>setUserInput(e.target.value) is similar to:
    // input: onChange={handleChange}
    //const handleChange = (e) => {
  //    setUserInput(e.target.value);
  //  }

  //onClick = {(e)=> setUserQuery(userInput)} is similar to
  //input: onClick={handleClick}
  //const handleClick = (e) => {
  //  setUserQuery(userInput);
//   }


  return (
    <>
    <div>
        <input type="text" placeholder="search" onChange={(e)=>setUserInput(e.target.value)} ></input>
        <button onClick={(e)=> setUserQuery(userInput)}>Search</button>
    </div>
    <div>
      {fetchData?(fetchData.hits.map((element,index)=>{
        return (
        <Fragment key={index}>
          <div>
            <h2>
              <a href={element.url} target="_blank" rel="noopener noreferrer">{element.title}</a>
            </h2>
          </div>
        </Fragment>
        )
      })):(
        <ClipLoader/>
      )}
    </div>
    </>
  );
}


export default App;

