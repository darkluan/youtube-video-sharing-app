import { ChangeEvent, useState } from 'react'
import useYoutubeApi from '~/hooks/useYoutubeApi'

const Index = () => {
  const { submitShared } = useYoutubeApi()
  const [url, setUrl] = useState('')

  const handleShared = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url) return
    await submitShared(url)
    setUrl('')
  }

  const handleChangeInput = (e: ChangeEvent<{ name: string; value: string }>) => {
    const { value } = e.target
    setUrl(value)
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
            <input
              onChange={handleChangeInput}
              name='url'
              value={url}
              className='input w-9/12'
              placeholder=''
              required
            />
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
