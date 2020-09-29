import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
//import FetchData from './components/API.js'


function App() {
  const [fetchData,setFetchData] = useState(null)
  //const [userInput,setUserInput] =useState("")
  
 // + userInput)
  useEffect(
    () => {
      fetch('http://hn.algolia.com/api/v1/search?query=react')
      .then(res => res.json())
      .then(data=>setFetchData(data))
      }
    ,[]) 
    fetchData&&console.log(fetchData)

  return (
    <div>
      {fetchData&&fetchData.hits.map((element,index)=>{
        return (
        <Fragment key={index}>
          <div>
            <h2>
              <a href={element.url} target="_blank">{element.title}</a>
            </h2>
          </div>
        </Fragment>
        )
      })}
    </div>
  );
}

//  <form>
//  <input type="text" placeholder="search" onChange={(e)=>setUserInput(e.target.value)}></input>
  //</form>

export default App;

