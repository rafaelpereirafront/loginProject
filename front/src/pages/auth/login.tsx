import ButtonComponent from '../../../components/buttonComponent'
import Link from 'next/link'
import { useEffect, useState, useLayoutEffect } from 'react'
import { server } from '@/server/server';
import Router from 'next/router';
import axios, { AxiosError } from 'axios';

export default function Login(){
  const [buttonActive, setButtonActive] = useState(true);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    setButtonActive(!email || !password? true: false);
  },[email, password]);

  const handleEmail = (event:any) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event:any) =>{
    setPassword(event.target.value)
  }

  const handleSubmit = async (event:any) =>{
    event.preventDefault();

    try{
     await axios.post(
      server.URL_LOGIN,{
        email,
        password
      });
      Router.push('/app/dashboard');
    }catch(error: any){
      const userError = error.response.data.message;
      setErrorMessage(userError);
    };
    setPassword('');
    setEmail('');
  };

  return(
      <div className="flex min-h-full h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email dress
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                placeholder="Email address"
                onChange={handleEmail}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={handlePassword}
              />
            </div>
          </div>

          <div>
            <ButtonComponent
              children={'Sing In'}
              disabled={buttonActive}
            />
          </div>
          {errorMessage && <p className="text-center text-red-500 font-medium">{errorMessage}</p>}
          <div>
            <div className='flex justify-center'>
              <p>Not registred?</p>
              <Link  href='/auth/register' className='text-blue-700 hover:underline dark:text-blue-500 ml-2'>Create account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
