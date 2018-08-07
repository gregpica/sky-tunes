import React from 'react'

const Login = props => {
  let errorDiv;

  if (props.error) {
    errorDiv  = <p>{props.error}</p>
  }

  return (
    <div>
      {errorDiv}
      <a href="/api/v1/login"><button>Log in</button></a>
    </div>
  )
}

export default Login
