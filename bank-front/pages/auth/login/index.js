import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import router from 'next/router'

export default function Login(){
 const [username, setUsername] = useState('')
 const [pass, setPassword] = useState('')
 const [user, setUser] = useState(null)

  const handleLogin = async (event) =>{
    event.preventDefault()

    try {
      const user = await axios.post('http://localhost:4001/api/auth/login', {
        username,
        pass
      })
      setUser(user)
      setUsername('')
      setPassword('')

      console.log(user)
      router.push('/dashboard')
      
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div class="flex flex-col h-screen bg-gray-100">
      <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

          <img
            className="mb-2 mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Login
            </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/auth/signup">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                o sign-up
              </a>
            </Link>
          </p>
          <form class="mt-8" >
            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Username</label>
            <input id="username" value={username} type="text" name="username" placeholder="username"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required 
              onChange={(event) => setUsername(event.target.value)}
               />

            <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
            <input id="password" value={pass} type="password" name="password" placeholder="password" autocomplete="password"
              class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required 
              onChange={(event) => setPassword(event.target.value)}
              />

            <button type="submit" onClick={ handleLogin }
              class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
              Login
                </button>
          </form>
        </div>
      </div>
    </div>
  )
}