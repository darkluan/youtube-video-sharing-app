import { BiHomeAlt } from 'react-icons/bi'
import FormLogin from '~/components/FormLogin'

function index() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between mx-8 p-4 md:p-8 border-b-2'>
        <div className='logo flex justify-center md:justify-normal items-center'>
          <BiHomeAlt size='2rem' />
          <h2>FUNNY MOVIES</h2>
        </div>
        <FormLogin />
      </div>
    </>
  )
}

export default index
