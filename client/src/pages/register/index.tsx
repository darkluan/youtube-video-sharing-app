function index() {
  return (
    <>
      <div className='w-full max-w-md m-auto mt-10'>
        <h4 className='text-center'>Register</h4>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
              Email
            </label>
            <input type='email' id='email' className='input ' placeholder='example@gmail.com' required />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Password
            </label>
            <input type='password' id='password' placeholder='password' className='input ' required />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='repeat-password'>
              Repeat Password
            </label>
            <input
              type='repeat-password'
              id='repeat-password'
              placeholder='repeat-password'
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

export default index
