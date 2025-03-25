'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
 const StreamVideoProvider = ({children}:{children:ReactNode}) => {
  const [videoClient,setvideoClient]=useState<StreamVideoClient>()
  const {user, isLoaded}=useUser();
  useEffect(()=>{
    if(isLoaded || !user) return;
    if(!API_KEY) throw new Error("Strea API key missing");
    const client=new StreamVideoClient({
      API_KEY,
      user:{
        id:user?.id,
        name:user?.username || user?.id,
        image:user?.imageUrl,
      },
      tokenProvider
    })
    

  },[user,isLoaded])
  return (
    <StreamVideo client={videoClient}>

    </StreamVideo>
  );
};
export default StreamVideoProvider