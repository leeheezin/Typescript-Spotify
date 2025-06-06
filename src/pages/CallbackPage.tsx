import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useExchangeToken from '../hooks/useExchangeToken'
import Loading from '../common/components/Loading/Loading'

const CallbackPage = () => {
  const navigate = useNavigate()
  const { mutate: exchangeToken } = useExchangeToken()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    const codeVerifier = localStorage.getItem('code_verifier')

    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier })
    } else {
      navigate('/')
    }
  }, [exchangeToken, navigate])

  return <Loading/>
}

export default CallbackPage
