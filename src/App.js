import { useState, useEffect} from 'react';

import './App.css';

function App() {
  
  const [loading, setLoading] =useState(false)
  const [urlls, setUrlls]=useState("https://swapi.dev/api/planets/")
  const [data, setData]=useState([])
  const [residentes, setResidentes]=useState('')
  const [data2, setData2]=useState([])
  
  function Planeta(props){
    const [personajes, setPersonajes]= useState([])
    useEffect(()=>{
      Promise.all(props.urls.map((url)=>fetch(url)))
      .then((respuesta) =>Promise.all(respuesta.map((res)=>res.json())))
      .then((datos)=>{
        setPersonajes(datos)
      })
    },[setData2]);

    const personajeHTML = personajes.map((personaje)=>{
      return <li>{personaje.name}</li>
    })
    return <ul>{personajeHTML}</ul>
  }


  useEffect(()=>{
    setLoading(true)
    fetch(urlls).then(res => res.json()).then((datos)=>setData(datos.results))
    setLoading(false)
  },[urlls])

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

      <Planeta urls={data2}/>
      

    </> 
  );
    }
}

export default App;
