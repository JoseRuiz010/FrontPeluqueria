import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Horario = () => {
  const { logout } = useContext(AuthContext);
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');


  const [horarios, sethorarios] = useState(null)
  useEffect(() => {
    getTurnos()
  }, [])

  const getTurnos = async () => {
    fetch('http://localhost:3000/api/turnos').then(res => res.json()).then(data => sethorarios(data))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fecha, hora, medioDePago: null, cliente: null, reservado: false })
      });

      if (!response.ok) {
        throw new Error('Error al guardar el turno');
      }

      const turnoGuardado = await response.json();
      console.log('Turno guardado:', turnoGuardado);
      // Aquí puedes manejar la respuesta del servidor, actualizar el estado, mostrar un mensaje de éxito, etc.
      getTurnos()
    } catch (error) {
      console.error('Error al guardar el turno:', error.message);
      // Aquí puedes manejar el error, mostrar un mensaje de error al usuario, etc.
    }
  };

  return (
    <div className='my-16'>
      <button onClick={logout} className='border px-3 py-2 rounded-lg bg-[#ee4747]'>Logout</button>
      <form onSubmit={handleSubmit} className='bg-white flex flex-col gap-3 max-w-xl px-5 py-8 max-h-[350px] w-[450px] mx-auto'>
        <h2 className='text-center font-bold text-lg'>Dar de alta horarios</h2>
        <div>
          <label className='font-bold'>Hora: </label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
            className='border px-3 py-2 rounded-lg bg-white'
            />
        </div>
        <div>
          <label className='font-bold'>Fecha: </label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className='border px-3 py-2 rounded-lg bg-white'
            />
        </div>
        <button type="submit" className='border px-3 py-2 rounded-lg bg-[#237FFF]' >Agregar Horario</button>
      </form>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
               
              <th className='text-center'>Fecha</th>
              <th className='text-center'>Hora</th>
              <th className='text-center'>Cliente</th>
              <th className='text-center'>Medio de pago</th>
              <th className='text-center'>Reservado</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {horarios?.map((h,i) => (
                <tr key={h._id}>
                  <th className='text-center'>{h.fecha}</th>
                  <td className='text-center'>{h.hora}</td>
                  <td className='text-center'>{h.cliente?h.cliente:'-'}</td>
                  <td className='text-center'>{h.medioDePago? h.medioDePago:'-'}</td>
                  <td className='text-center'>{h.reservado? 'Si':'No'}</td>
                </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


