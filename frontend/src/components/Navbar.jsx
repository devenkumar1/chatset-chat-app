import React from 'react'
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

function Navbar() {
  const { authUser, logout } = useAuthStore();
  return <header
    className='fixed top-0 z-40 w-full bg-base-100 boder-b border-base-300 backdrop-blur-lg bg-base-100/80'
  >
    <div className='container h-16 px-4 mx-auto '>
      <div className="flex items-center justify-between h-full ">
        <div className="flex items-center gap-8">
          <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all' >
            <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-primary/10">

              <MessageSquare className='w-5 h-5 text-primary' />

            </div>
            <h1 className='text-lg font-bold'>chat'in</h1>

          </Link>
        </div>
        <div className="flex items-center gap-2 ">
          <Link to="/settings" className='gap-2 transition-colors btn btn-sm' >
            <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-primary/10">

              <Settings className='w-4 h-4 ' />

            </div>
            <span className='hidden sm:inline'>Settings</span>

          </Link>
          {authUser && (
            <>
              <Link to={"/profile"}>
                <User className=' size-5'/>
                <span className='hidden sm:inline'>Profile</span>
              </Link>
              <button className='flex items-center gap-2' onClick={logout}>
                <LogOut className='size-5' />
                <span className='hidden sm:inline'>Logout</span>

              </button>

            </>
          )

          }


        </div>
      </div>

    </div>
  </header>
}

export default Navbar