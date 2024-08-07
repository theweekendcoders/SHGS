import React from 'react'
import Image from 'next/image'
const loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Image 
            src='/assets/loading.gif'
            width={30}
            height={30}
            alt='Loading'
        />
    </div>
  )
}

export default loading
