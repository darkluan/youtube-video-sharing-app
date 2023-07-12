import { describe, expect, test, beforeEach, jest } from '@jest/globals'
import axios from 'axios'
import { shallow } from 'enzyme'
import { useAppContext } from '../src/context/AppContext'
import { ComponentWithUseAuthHook } from './useAuth.mock'

jest.mock('axios')
jest.mock('../src/context/AppContext', () => ({
  useAppContext: jest.fn()
}))

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('login function should set user and call setIsLoading', async () => {
    const setUserMock = jest.fn()
    const setIsLoadingMock = jest.fn()

    ;(useAppContext as jest.Mock).mockReturnValue({
      setUser: setUserMock,
      setIsLoading: setIsLoadingMock
    })

    const wrapper = shallow(<ComponentWithUseAuthHook />)

    // Mock the axios post request
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          user: {
            id: 1,
            email: 'test@example.com'
          }
        }
      }
    })

    // Simulate a login action
    await wrapper.instance().login({
      email: 'test@example.com',
      password: 'password'
    })

    // Assertions
    expect(setUserMock).toHaveBeenCalledWith({
      id: 1,
      email: 'test@example.com'
    })
    expect(setIsLoadingMock).toHaveBeenCalledTimes(2) // Once for setIsLoading(true), once for setIsLoading(false)
    expect(axios.post).toHaveBeenCalledWith('your-api-endpoint', {
      email: 'test@example.com',
      password: 'password',
      grant_type: 'password'
    })
  })
})
