import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!JSON.parse(sessionStorage.getItem('userData') ?? "{}")?.jwt ){
      navigate('/sign-in')
    }
  },[navigate])
  return (
    <div>
      
    </div>
  )
}

export default Home
