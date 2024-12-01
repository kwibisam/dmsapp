import React from 'react'

const SignIn = () => {
  return (
    <div>
          <form>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign In</button>
    </form>
    </div>
  )
}

export default SignIn
