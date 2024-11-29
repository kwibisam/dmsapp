import React from 'react'

const SignIn = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-6">Sign In</h1>

        <div className="mt-8">
          <form className="flex flex-col space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="pwd"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Sign In
            </button>
          </form>
        </div>
        
      </div>  
    </main>
  )
}

export default SignIn;
