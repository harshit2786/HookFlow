import LoginForm from '@/components/Custom/LoginForm'
import { LogIn } from 'lucide-react'

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">
        <div className="text-center">
          <div className="flex justify-center">
            <LogIn className="h-12 w-12 text-indigo-400" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">Welcome to Hookflow</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        <LoginForm type="up" />
      </div>
    </div>
  )
}

export default SignUp
