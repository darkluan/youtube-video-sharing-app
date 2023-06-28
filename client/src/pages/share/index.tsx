import { ChangeEvent, useState } from 'react'

const Index = () => {
  const [sharedData, setSharedData] = useState({
    url: '',
    sharedBy: ''
  })

  const handleShared = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!sharedData.url || !sharedData.sharedBy) return
    await setSharedData(sharedData)
  }

  const handleChangeInput = (e: ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = e.target
    setSharedData((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <div className='w-full max-w-lg m-auto mt-10'>
        <b className='text-left'>Share a youtube movie</b>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleShared}>
          <div className='mb-4 flex justify-between items-center'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='url'>
              Youtube URL
            </label>
            <input onChange={handleChangeInput} name='url' className='input w-9/12' placeholder='' required />
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

export default Index
