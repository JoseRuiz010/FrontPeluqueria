import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const turnosDisponibles = [
  {
    fecha: "2024-06-12",
    hora: "10:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-13",
    hora: "11:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-14",
    hora: "12:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-15",
    hora: "13:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-16",
    hora: "14:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-17",
    hora: "15:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-18",
    hora: "16:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-19",
    hora: "17:00",
    medioDePago: null,
    cliente: null
  },
  {
    fecha: "2024-06-20",
    hora: "18:00",
    medioDePago: null,
    cliente: null
  }
];

export const Navbar = () => {
  return (
    <div className='h-[60px] px-16 flex justify-between border-b shadow-sm'>
      <div className='flex'>
      <h1 className='font-bold text-3xl self-center'>Logo</h1>
      </div>
      <div className='flex'>
      <Link to={'/login'} className='font-bold text-lg self-center'>Ingresar</Link>
      </div>
    </div>
  )
}

export const Home = () => {

  const [horarios, sethorarios] = useState(null)
  useEffect(() => {
    getTurnos()
  }, [])
  
  const getTurnos=async()=>{
    fetch('http://localhost:3000/api/turnos').then(res=>res.json()).then(data=>sethorarios(data))
  }

  return (
    <div className='h-screen '>
      <Navbar />
      <div className='font-bold  flex-1  py-4 md:w-9/12 mx-auto'>
        <h1 className='text-center text-3xl mb-14'>Turnos Disponibles</h1>
       {horarios&& <div className='flex flex-wrap gap-4'>
          {turnosDisponibles.map(t => (
            <div className='py-3 px-8 rounded-xl shadow-xl flex flex-col w-[250px] bg-white'>
              <h3 className='bg-white'>Fecha: {`${t.fecha}`}</h3>
              <h3 className='bg-white'>Hora: {`${t.hora}`}</h3>
              <button className='bg-[#237FFF] px-4 py-2 text-center rounded-lg mt-6 mx-auto'>Reservar</button>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}