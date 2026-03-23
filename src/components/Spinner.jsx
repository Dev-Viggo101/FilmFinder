import React from 'react'

function Spinner() {
  return (
    <div className="spinner-container">

      <div className="spinner" style={{width: '40px', height: '40px', borderRadius: '50%', border: '2px solid black', borderTopColor: 'red'}}></div>

    </div>
  )
}

export default Spinner