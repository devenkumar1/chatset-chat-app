import React,{useState,} from 'react'
import {Link}  from 'react-router-dom'
import useAuthStore from '../store/useAuthStore';
import { Eye, EyeOff,Loader2, LockIcon, Mail, MessageSquare, User } from 'lucide-react';
import toast from 'react-hot-toast';

function SignupPage() {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState(
    {
      fullName:"",
      email:"",
      password:""
    }
  );


  const {signup,isSigningUp}=useAuthStore();

  const validateForm=()=>{
    if(!formData.fullName.trim()) return toast.error("full name is required ");
    if(!formData.email.trim()) return toast.error("Email is required ");
    if(!formData.password.trim()) return toast.error("password  is required ");
    // if(!formData.password.length<6) return toast.error("A password of min 6 character is required ");
    

    return true;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
  const success=validateForm();
  if(success===true) signup(formData);
  }

  
  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      {/* Left side Form */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-12 '>
    <div className='w-full max-w-md space-y-8 '>
      <div className='flex flex-col items-center gap-2 group'>
        <div className='size-12 rounded-xl bg-primary/`0 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
          <MessageSquare className='size-6 text-primary'/>
          
        </div>
        <h1 className='mt-2 text-2xl font-bold '>Create Account</h1>
        <p className='text-base-content/60'>Get started with your free account</p>
      </div>
    </div>
    <form onSubmit={handleSubmit} className='space-y-6' >
       <div className='form-control'>
        <label className='label'>
          <span className='font-medium label-text'>Full Name</span>
        </label>
        <div className="relative">
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <User className=" size-5 text-base-content/40"/>
            
          </div>
          <input type="text" className='w-full pl-10 input input-bordered'
          placeholder='Alive Sunny'
          value={formData.fullName}
          onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
          
          />
        </div>
        
       </div>
       <div className='form-control'>
        <label  className="label">
          <span className='font-medium label-text'>Email</span>
        </label>
        <div className="relative">
          <div className="absolute left-0 flex items-center pt-3 pl-3 pointer-events-none insert-y-0">
            <Mail className='text-base size-5-content/40'/>

          </div>
          <input type="email" className="w-full pl-10 input input-bordered"
          placeholder='sunny@example.com'
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
           
          
          />
        </div>
        <div className='form-control'>
          <label  className="label">
            <span className='font-medium label-text'>Password</span>
            
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockIcon className="text-base-content/40 size-5"/>
            
              </div>
            <input
            type={showPassword?"text":"password"}
            className='w-full pl-10 input input-bordered'
            placeholder='.....'
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})} 
            
            />
            <button 
            type='button'
            className='absolute inset-y-0 right-0 flex items-center pr-3'
            onClick={()=>setShowPassword(!showPassword)}>
              {showPassword?(
                <EyeOff className='size-5 text-base-content/40'/>
              ):(
                <Eye className='size-5 text-base-content/40'/>
              )}
            </button>
            
          </div>
          
        </div>
        
        <button 
        type="submit"
        className='w-full mt-3 btn btn-primary 'disabled={isSigningUp}
        >
          {isSigningUp?(
            <>
            <Loader2 className='size-5 animate-spin' />
            Loading...
            </>
          ):
          (
            "Create Account"
          )
            
          }
          
        </button>
        
       </div>
      
      
    </form>
    <div className="text-center">
      <p className='text-base-content/50'>Already have an Account?{" "}
      <Link to={"/login"} className='link link-primary'>sign in </Link>
      </p>
    </div>
        
      </div>

      
    </div>

  )
}

export default SignupPage