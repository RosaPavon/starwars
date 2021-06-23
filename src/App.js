import { useState, useEffect} from 'react';

import './App.css';

function App() {
  
  const [loading, setLoading] =useState(false)
  const [url, setUrl]=useState("https://swapi.dev/api/planets/")
  const [data, setData]=useState([])
  const [residentes, setResidentes]=useState('')
  const [data2, setData2]=useState([])
  


  useEffect(()=>{
    setLoading(true)
    fetch(url).then(res => res.json()).then((datos)=>setData(datos.results))
    setLoading(false)
  },[url])

  useEffect(()=>{
    setLoading(true)
    fetch(`https://swapi.dev/api/planets/`).then(res => res.json()).then((datos)=>setData2(datos.results))
    setLoading(false)
  },[residentes])

  if(loading){
    return <h2>Cargando....</h2>
  }else{

  return (
    <>
     <h1>Planetas</h1>
     <select onChange={ (e) => setResidentes(e.target.value)}>{/* aqui se muestra el que ha elegido el usuario y que esta en planeta */}
      {data.map((planet) =>
      <option key={planet.name} value={planet.name}>{planet.name}</option>)}     
      
      </select>
      <h1>{residentes}</h1>
      <ul>
      {data.map((data, index)=>{
        if(residentes===data.name){
       return <li key={data.name}>{data.residents}</li>}
       })}
      </ul>
      

    </> 
  );
    }
}

export default App;
