import React from 'react'

const Alert = ({ variant='green', message, show=false }) => {
  return (
    <>
    {
        show && (<div className={`alert bg-${variant}-100 border border-${variant}-400 px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{message}</strong>
        </div>)
    }
    </>
  )
}

export default Alert