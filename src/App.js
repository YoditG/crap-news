import React, { useState, useEffect, Fragment} from 'react';
import kaka from './kaka.png';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const [fetchData,setFetchData] = useState(null)
  const [userInput,setUserInput] =useState("")
  const [userQuery,setUserQuery] =useState("")
  const [loading, setLoading] = useState(true)
  const [content,setContent] = useState(true)
  
  

  useEffect(
    () => { 
      const url = `http://hn.algolia.com/api/v1/search?query=${userQuery}`
      console.log(url)
      const fetching = () =>{ 
      fetch(url)
      .then(res => res.json())
      .then(data=>{!data&&setContent(false);setFetchData(data);setLoading(false);console.log(data)})
      .catch(error=>alert("loading error"))
      }
      fetching();
      
    const refresh = setInterval(()=>fetching(),3000)
    return ()=>clearInterval(refresh)
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
    <div className="body-container">
    <header className="header-container">
    <div ><h1 style={{fontSize: 80}}> Crap News</h1></div>
    
    <h3 style={{fontSize: 40}}>get the latest news on <img alt="kaka" className="kaka-image" src={kaka}/></h3>
    </header>
    <div>
        <input type="text" placeholder="crap-search" onChange={(e)=>setUserInput(e.target.value)} className="searchBar" ></input>
        <button onClick={(e)=>{setUserQuery(userInput);setLoading(true)}}>Search</button>
    </div>
    <div>
      {content?
      loading?(
        <>
        <p>Flushing...</p><ClipLoader/> 
        </>
      ):(fetchData.hits.map((element,index)=>{
        return (
        <Fragment key={index}>
          <div>
            <h2>
              <a style={{textDecoration: 'none'}} className="linkStyle" href={element.url} target="_blank" rel="noopener noreferrer">{element.title}</a>
            </h2>
          </div>
        </Fragment>
        )
      }))
      :  <p> No Restults found.</p>}
    </div>
    </div>
  );
}


export default App;

