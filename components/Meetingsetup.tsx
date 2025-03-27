import { VideoPreview } from '@stream-io/video-react-sdk'
import React from 'react'

const Meetingsetup = () => {
    
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white  bg-[#1C1F2E]'
    
    >
        <h1 className='text-2xl font-bold'>SetUP</h1>
        <VideoPreview/>
    </div>
  )
}

export default Meetingsetup