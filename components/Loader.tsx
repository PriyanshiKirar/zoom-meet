"use client"


import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <Image
        src='/icons/loading-circle.svg'
        alt='Loading'
        width={50}
        height={50}
        priority
      />
    </div>
  )
}

export default Loader
// import React from 'react'

// const Loader = () => {
//   return (
//     <div>Loader</div>
//   )
// }

// export default Loader