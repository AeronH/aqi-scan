import React from 'react'
import Map from '../../components/Map'

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto h-screen w-screen mt-16">
      <div className='w-full h-[600px] p-10'>
        <Map lat={20} lng={20} zoom={1}/>
      </div>
    </div>
  )
}

export default HomePage