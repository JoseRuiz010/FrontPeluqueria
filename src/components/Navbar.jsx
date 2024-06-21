import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { user,logout } = useContext(AuthContext);
  return (
    <div className='h-[60px] px-16 flex justify-between border-b shadow-sm'>
      <div className='flex'>
      <h1 className='font-bold text-3xl self-center'>Logo</h1>
      </div>
     {!user && <div className='flex'>
      <Link to={'/login'} className='font-bold text-lg self-center'>Ingresar</Link>
      </div>}
      {user&& <div className='flex'>
      <Link onClick={logout} className='font-bold text-lg self-center bg-red-400 px-3 py-2 rounded-md'>Logout</Link>
      </div>}
    </div>
  )
}
