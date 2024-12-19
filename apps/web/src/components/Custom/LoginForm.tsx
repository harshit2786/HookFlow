import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import LoadingSpinner from './Spinner';
import axios from 'axios';

export default function LoginForm({type} : {type : "in"| "up"}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName,setUserName] = useState("");
  const [rePass,setRePass] = useState('');

  const handleSignIn = async() => {
    if(email.trim() === "" || password.trim() === ""){
        return;
    }
    try{
        setIsLoading(true);
        const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,{email , password});
        console.log(resp.data);
    } catch(e){
        console.log(e)
    } finally {
        setIsLoading(false);
    }
  }

  const handleSignUp = async() => {
    if(email.trim() === "" || password.trim() === "" || rePass === "" || userName === "" || password !== rePass){
        return;
    }
    try{
        setIsLoading(true)
        const resp = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,{email , password , userName});
        console.log(resp.data);
    } catch(e){
        console.log(e)
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-6" >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {type === "up" && <div>
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
              placeholder="John Doe"
            />
          </div>
        </div>}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
              placeholder="••••••••"
            />
          </div>
        </div>

        {type === "up" && <div>
          <label className="block text-sm font-medium text-gray-300">
            Re-enter Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
              placeholder="••••••••"
            />
          </div>
        </div>}
      </div>

      <button
        onClick={type === "in" ? handleSignIn : handleSignUp}
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:ring-offset-gray-900"
      >
        {isLoading ? <LoadingSpinner /> : type === "in" ? "Sign In" : "Sign Up"}
      </button>

      <div className="text-center text-sm">
        <span className="text-gray-400">{ type === "in" ? "Don't have an account?" : "Already have an account?"}</span>{' '}
        <a href={type === "in" ? "/sign-up" : "sign-in"} className="font-medium text-indigo-400 hover:text-indigo-300">
          {type === "in" ? "Sign Up" : "Sign In"}
        </a>
      </div>
    </div>
  );
}