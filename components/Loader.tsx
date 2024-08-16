import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex-center w-full h-screen'>
        <Image
        src="/icons/loading-circle.svg"
        alt="loading circle"
        height={50}
        width={50}
        />
    </div>
  )
}

export default Loader
