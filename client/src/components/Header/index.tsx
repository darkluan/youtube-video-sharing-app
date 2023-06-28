import { BiHomeAlt } from 'react-icons/bi'
import FormLogin from '~/components/FormLogin'
import { Link } from 'react-router-dom'

function index() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between mx-8 p-4 md:p-8 border-b-2'>
        <Link to={'/'} className='logo flex justify-center md:justify-normal items-center'>
          <BiHomeAlt size='2rem' />
          <h2>FUNNY MOVIES</h2>
        </Link>
        <FormLogin />
      </div>
    </>
  )
}

export default index
