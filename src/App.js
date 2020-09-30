import React, { useState, useEffect, Fragment, useRef } from 'react';
//import logo from './logo.svg';
import './App.css';


function App() {
  const [fetchData,setFetchData] = useState(null)
  const [userInput,setUserInput] =useState("bla")
  
  const searchBar = useRef(null)

  useEffect(
    () => { 
      searchBar.current.focus()
      console.log(searchBar.current[0].value)
      setUserInput(searchBar.current[0].value)
      const url = `http://hn.algolia.com/api/v1/search?query=${searchBar.current[0].value}`
      console.log(url)
      fetch(url)
      .then(res => res.json())
      .then(data=>setFetchData(data))
      }
    ,[userInput]) 
    
  return (
    <>
    <div >
    
      <form ref = {searchBar}>
        <input type="text" placeholder="search" onChange={(e)=>setUserInput(e.target.value)} ></input>
      </form>
    </div>
    <div>
      {fetchData&&fetchData.hits.map((element,index)=>{
        return (
        <Fragment key={index}>
          <div>
            <h2>
              <a href={element.url} target="_blank" rel="noopener noreferrer">{element.title}</a>
            </h2>
          </div>
        </Fragment>
        )
      })}
    </div>
    </>
  );
}


export default App;

