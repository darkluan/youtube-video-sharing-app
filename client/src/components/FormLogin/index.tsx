function index() {
  return (
    <form className='flex flex-col md:flex-row gap-2'>
      <div className='flex justify-center md:justify-end gap-2'>
        <div className='mb-6'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Your email
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 '
            placeholder='example@gmail.com'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Your password
          </label>
          <input
            type='password'
            id='password'
            placeholder='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 '
            required
          />
        </div>
      </div>
      <div className='flex justify-center md:justify-end gap-2'>
        <button type='submit' className='btn mr-2'>
          Login
        </button>
        <button className='btn'>Register</button>
      </div>
    </form>
  )
}

export default index
