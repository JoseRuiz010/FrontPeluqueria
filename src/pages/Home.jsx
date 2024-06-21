import React, { useEffect, useState } from 'react'
import Modal from '../components/ModalRegistrar';
import { Navbar } from '../components/Navbar';


export const Home = () => {

  const [horarios, sethorarios] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [turnoSelected, setTurnoSelected] = useState(null)
  useEffect(() => {
    getTurnos()
  }, [isOpen])
  
  const getTurnos=async()=>{
    fetch('http://localhost:3000/api/turnos').then(res=>res.json()).then(data=>sethorarios(data))
  }
  const openModal =(turnoSelected)=>{
    setTurnoSelected(turnoSelected);
    setisOpen(true);
  }
  const closeModal =()=>setisOpen(false)

  return (
    <div className='h-screen '>
      <Navbar />
      <div className='font-bold  flex-1  py-4 md:w-9/12 mx-auto'>
        <h1 className='text-center text-3xl mb-14'>Turnos Disponibles</h1>
       {horarios&& <div className='flex flex-wrap gap-4'>
          {horarios?.map(t => (
            <div key={t._id} className='py-3 px-8 rounded-xl shadow-xl flex flex-col w-[250px] bg-white'>
              <h3 className='bg-white'>Fecha: {`${t.fecha}`}</h3>
              <h3 className='bg-white'>Hora: {`${t.hora}`}</h3>
              <h3 className='bg-white'>Hora: {`${t.reservado}`}</h3>
             <button disabled={t.reservado} className={`${t.reservado?' border-2':'bg-[#237FFF]'}  px-4 py-2 text-center rounded-lg mt-6 mx-auto`}  onClick={()=>openModal(t)}>{`${t.reservado?'Reservado':'Reservar'}`}</button>
            </div>
          ))}
        </div>}
      </div>
      <Modal isOpen={isOpen} onClose={()=>closeModal()} turnoSelected={turnoSelected}/>
    </div>
  )
}