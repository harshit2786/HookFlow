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
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-background via-background to-blue-900/50 overflow-y-auto ">
      <Navbar />
      <main className="container flex-1 overflow-y-auto">
        <Outlet/>
      </main>
    </div>
  )
}

export default Home
