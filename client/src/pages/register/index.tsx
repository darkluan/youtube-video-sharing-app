import { ChangeEvent, useState } from 'react'
import useAuth from '~/hooks/useAuth'
import { errorNotify } from '~/utils/helper'

const Index = () => {
  const { register } = useAuth()
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  })

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!registerData.email || !registerData.password) return
    if (registerData.password !== registerData.repeatPassword) {
      errorNotify({ message: 'Password and Repeat password are not the same' })
      setRegisterData((prev) => ({ ...prev, repeatPassword: '' }))
      return
    }
    await register(registerData)
  }

  const handleChangeInput = (e: ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className='w-full max-w-md m-auto mt-10'>
        <h4 className='text-center'>Register</h4>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleRegister}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input
              onChange={handleChangeInput}
              type='email'
              name='email'
              className='input '
              placeholder='example@gmail.com'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input
              onChange={handleChangeInput}
              type='password'
              name='password'
              placeholder='password'
              className='input '
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='repeatPassword'>
              Repeat Password
            </label>
            <input
              onChange={handleChangeInput}
              type='password'
              name='repeatPassword'
              placeholder='repeat password'
              className='input '
              required
            />
          </div>
          <div className='flex items-center justify-center'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Index
