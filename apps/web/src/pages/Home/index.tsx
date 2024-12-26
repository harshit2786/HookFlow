import { Navbar } from '@/components/Custom/navbar';
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!JSON.parse(sessionStorage.getItem('userData') ?? "{}")?.jwt ){
      navigate('/sign-in')
    }
  },[navigate])
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-900/50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet/>
      </main>
    </div>
  )
}

export default Home
