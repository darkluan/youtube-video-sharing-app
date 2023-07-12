// Create a dummy component that uses the useAuth hook for testing
import useAuth from '../src/hooks/useAuth'
export const ComponentWithUseAuthHook: React.FunctionComponent = () => {
  const auth = useAuth()
  return null
}
