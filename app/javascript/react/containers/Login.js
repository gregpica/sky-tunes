import React from 'react'

const Login = props => {

  return (
    <div>
      <div className="text-center login">
          <a href="/api/v1/login">
            <button className="login-button">Log in</button>
          </a>
      </div>
    </div>
  )
}

export default Login
