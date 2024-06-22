import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import Swal from 'sweetalert2';

export const Horario = () => {
  const { logout } = useContext(AuthContext);
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [horarios, setHorarios] = useState(null);

  useEffect(() => {
    getTurnos();
  }, []);

  const getTurnos = async () => {
    fetch('http://localhost:3000/api/turnos')
      .then(res => res.json())
      .then(data => setHorarios(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/turnos/cancelar', {
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
      getTurnos();
    } catch (error) {
      console.error('Error al guardar el turno:', error.message);
    }
  };

  const handleCancelarReserva = async (turno) => {
    const { fecha, hora, cliente, medioDePago } = turno;
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Cancelar el turno de ${cliente || 'Cliente'} en la fecha ${fecha} a las ${hora}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('http://localhost:3000/api/turnos/cancelar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fecha, hora })
          });

          if (!response.ok) {
            throw new Error('Error al cancelar la reserva');
          }

          const resultado = await response.json();
          console.log('Reserva cancelada:', resultado);

          Swal.fire(
            '¡Cancelado!',
            'El turno ha sido cancelado.',
            'success'
          );

          getTurnos();
        } catch (error) {
          console.error('Error al cancelar la reserva:', error.message);

          Swal.fire(
            'Error',
            'Hubo un problema al cancelar el turno.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className='h-screen overflow-hidden'>
      <Navbar />
      <div className='my-16 mx-auto max-w-[1500px]'>
        <form onSubmit={handleSubmit} className='bg-white shadow-sm mb-2 flex flex-col gap-3 max-w-xl px-5 py-3 max-h-[350px] w-[450px] mx-auto'>
          <h2 className='text-center font-bold text-lg'>Dar de alta horarios</h2>
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
          <button type="submit" className='border px-3 py-2 rounded-lg bg-[#237FFF]'>Agregar Horario</button>
        </form>
        <div className="max-h-[500px] overflow-y-auto">
          <table className="table border border-gray-400 m-2 mx-auto">
            <thead>
              <tr className='border-gray-400'>
                <th className='text-center'>Fecha</th>
                <th className='text-center'>Hora</th>
                <th className='text-center'>Cliente</th>
                <th className='text-center'>Medio de pago</th>
                <th className='text-center'>Reservado</th>
                <th className='text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios?.map((h, i) => (
                <tr key={h._id} className='border-b border border-gray-300'>
                  <th className='text-center'>{h.fecha}</th>
                  <td className='text-center'>{h.hora}</td>
                  <td className='text-center'>{h.cliente ? h.cliente : '-'}</td>
                  <td className='text-center'>{h.medioDePago ? h.medioDePago : '-'}</td>
                  <td className={`text-center`}>
                    <div className={`${h.reservado ? 'bg-red-400' : 'bg-green-600'} font-bold w-8/12 rounded-lg mx-auto`}>
                      {h.reservado ? 'Si' : 'No'}
                    </div>
                  </td>
                  <td className='text-center'>
                    <button
                      className={`border px-2 py-1 rounded-lg ${h.reservado ? 'bg-red-500' : 'bg-gray-400'} text-white`}
                      onClick={() => handleCancelarReserva(h)}
                      disabled={!h.reservado}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
