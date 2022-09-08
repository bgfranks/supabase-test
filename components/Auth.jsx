import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  // handle the email login with magic link
  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })

      if (error) throw error
      alert('check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleButtonLogin = (e) => {
    e.preventDefault()
    handleLogin(email)
  }

  return (
    <div className='flex card bg-base-200 max-w-2xl mt-40  mx-auto'>
      <div className='flex flex-col items-center pb-10'>
        <h1 className='text-7xl py-5'>Welcome!</h1>
        <p className='pb-5 text-xl'>Sign in with a magic link!</p>
        <div>
          <input
            className='input input-bordered input-accent w-full mb-5'
            type='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            className='btn-primary w-full h-10 px-8 rounded-lg'
            onClick={handleButtonLogin}
          >
            <span>{loading ? 'Loading...' : 'Send Magic Link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
