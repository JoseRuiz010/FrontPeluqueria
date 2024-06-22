import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, redirect } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Swal from 'sweetalert2';

export const Login = () => {
  const { login } = useContext(AuthContext);
   const [credenciales, setCredenciales] = useState({
    email:"admin@admin.com",
    password:"1234"
  })
  const onChange =(e)=>{
    e.preventDefault();
    console.log(e)
    setCredenciales(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const onSuibmit=(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/api/users/login',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body:JSON.stringify(credenciales)

    }).then(res=>res.json()).then(data=>{
      if(data.error){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error,
        });
      }else{
        login(data)
      }
      
      })

  }
  return (
    <div className='h-screen flex flex-col gap-4 '>
    <Navbar />
    <div className='font-bold  flex-1 mx-auto   bg-white px-5 py-8 max-h-[350px] w-[450px]'>
      <h1 className='text-center text-3xl mb-14'>Iniciar sesion</h1>
      <form className='flex flex-col gap-5' onSubmit={onSuibmit}>
          <input name='email' value={credenciales.email} className='border px-3 py-2 rounded-lg bg-white' type="text" placeholder='Email' onChange={onChange}/>
          <input name='password' value={credenciales.password} className='border px-3 py-2 rounded-lg bg-white' type="text" placeholder='Password' onChange={onChange}/>
          <button className='border px-3 py-2 rounded-lg bg-[#237FFF]' type="submit">Ingresar</button>
      </form>
    </div>
  </div>
  )
}
