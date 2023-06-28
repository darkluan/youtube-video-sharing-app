function index() {
  return (
    <>
      <div className='w-full max-w-lg m-auto mt-10'>
        <b className='text-left'>Share a youtube movie</b>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4 flex justify-between items-center'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='url'>
              Youtube URL
            </label>
            <input type='url' id='url' className='input w-9/12' placeholder='' required />
          </div>

          <div className='flex items-center justify-center'>
            <button className='btn' type='submit'>
              Shared
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default index
