import { useAppContext } from '~/context/AppContext'
import useAuth from '~/hooks/useAuth'
import { Link } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'

const Index = () => {
  const { user } = useAppContext()
  const { logout, login } = useAuth()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!loginData.email || !loginData.password) return
    await login(loginData)
  }

  const handleChangeInput = (e: ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  if (user?.email) {
    return (
      <div className='flex justify-center items-center md:justify-end gap-2 my-5'>
        <div>
          <b>Welcome: {user.email}</b>
        </div>
        <Link to='/share' className='btn'>
          Share a movie
        </Link>
        <button onClick={logout} className='btn'>
          Logout
        </button>
      </div>
    )
  }

  return (
    <form className='flex flex-col md:flex-row gap-2 my-5' onSubmit={handleLogin}>
      <div className='flex justify-center md:justify-end gap-2'>
        <div className=''>
          <input
            onChange={handleChangeInput}
            type='email'
            name='email'
            className='input '
            placeholder='example@gmail.com'
            required
          />
        </div>
        <div className=''>
          <input
            onChange={handleChangeInput}
            type='password'
            name='password'
            placeholder='password'
            className='input '
            required
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-end gap-2'>
        <button type='submit' className='btn '>
          Login
        </button>
        <Link to={'/register'} className='btn '>
          Register
        </Link>
      </div>
    </form>
  )
}

export default Index
