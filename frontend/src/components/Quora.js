import React from 'react'
import QuoraHeader from './QuoraHeader'
import Feed from './Feed'
import './css/Quora.css'

function Quora() {
  return (
    <div className='quora'>
        <QuoraHeader/>
        <div className='quora-contents'>
          <div className='quora-content'>
            <Feed />
          </div>
        </div>
    </div>
  )
}

export default Quora