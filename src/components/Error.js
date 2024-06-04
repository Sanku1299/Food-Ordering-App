import React from 'react'
import { useRouteError } from 'react-router-dom';

const Error = () => {
    const err = useRouteError();
    console.log(err);
  return (
    <div>
    <h1>OOPS!</h1>
    <h1>Something Went Wrong!</h1>
    <h2>{err.data}</h2>
    </div>
  )
}

export default Error;