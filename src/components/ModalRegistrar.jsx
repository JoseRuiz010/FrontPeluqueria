import React, { useState } from 'react';
import mediosDePago from '../config/mediosDepago';

const Modal = ({ isOpen, onClose, turnoSelected }) => {
  const [nombre, setNombre] = useState('');
  const [medioDePago, setMedioDePago] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const isFormValid = nombre !== '' && medioDePago !== '';

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleMedioDePagoChange = (e) => {
    setMedioDePago(e.target.value);
  };

  const handleReservar = async () => {
    if (isFormValid) {
      setLoading(true);
      setError('');
      
      const data = {
        fecha: turnoSelected.fecha,
        hora: turnoSelected.hora,
        cliente: nombre,
        medioDePago: medioDePago
      };

      try {
        const response = await fetch('http://localhost:3000/api/turnos/reservar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Error al reservar el turno');
        }

        const result = await response.json();
        console.log('Turno reservado:', result);
        onClose();
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
        <button
          className="absolute top-0 right-0 m-3"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Turno seleccionado
          </h3>
          <div className="mt-2 flex flex-col gap-4 text-start">
            <h3 className=' bg-white'><span className='font-bold'>Fecha:</span> {`${turnoSelected?.fecha}`}</h3>
            <h3 className=' bg-white'><span className='font-bold'>Hora:</span> {`${turnoSelected?.hora}`}</h3>
          </div> 
          <div className='flex flex-col gap-4'>
            <div className='flex '>
              <label className='font-bold basis-1/4' htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                className='basis-3/4 border border-gray-200 ml-2 px-3 py-1 rounded-md'
                placeholder='Ingrese su nombre'
                value={nombre}
                onChange={handleNombreChange}
              />
            </div>
            <div className='flex'>
              <label className="font-bold basis-1/4" htmlFor="medioDePago">Medio de pago</label>
              <select
                id="medioDePago"
                className='basis-3/4 p-2 border ml-2 border-gray-200 rounded-md'
                value={medioDePago}
                onChange={handleMedioDePagoChange}
              >
                <option value="">Seleccionar...</option>
                {mediosDePago.map((m, index) => (
                  <option key={index} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className={`px-4 py-2 text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
              onClick={handleReservar}
              disabled={!isFormValid}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
