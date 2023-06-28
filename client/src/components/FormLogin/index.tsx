import { useAppContext } from '~/context/AppContext'
import useAuth from '~/hooks/useAuth'
import { Link } from 'react-router-dom'
import { setLocalStorage } from '~/utils/handleLocalStorage'

const Index = () => {
  const { user, setUser } = useAppContext()
  const { logout, login } = useAuth()

  const handleLogin = () => {
    const params = { email: '1111@gmail.com', password: '1234' }
    login(params)
    setLocalStorage('auth', JSON.stringify(params.email))
    setUser({ email: '1111@gmail.com' })
  }

  if (user.email) {
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
    <form className='flex flex-col md:flex-row gap-2 my-5'>
      <div className='flex justify-center md:justify-end gap-2'>
        <div className=''>
          <input type='email' id='email' className='input ' placeholder='example@gmail.com' required />
        </div>
        <div className=''>
          <input type='password' id='password' placeholder='password' className='input ' required />
        </div>
      </div>
      <div className='flex justify-center md:justify-end gap-2'>
        <button onClick={handleLogin} type='submit' className='btn '>
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
