"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Meetingsetup = ({setisSetupComplete}:{setisSetupComplete:(value:boolean)=>void}) => {
  const [isMicCamToggledOn, setisMicCamToggledOn] = useState(false);

  const call = useCall();
if(!call){
  throw new Error("usecall must be used within Steamcall component");
  
}
  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white  bg-[#1C1F2E]">
      <h1 className="text-2xl font-bold">SetUP</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-between gap-3">
        <label className="flex h-16 items-center justify-between gap-2 font-medium">
          <input type="checkbox"
          checked={isMicCamToggledOn}
          onChange={(e)=>setisMicCamToggledOn(e.target.checked)}
           />
           Join with mic and camera off
        </label>
<DeviceSettings/>
      </div>
      <Button  onClick={()=>{
        call.join();
        setisSetupComplete(true);
      }}
       className="rounded-md bg-green-500 px-4 py-2.5">
Join meeting
      </Button>
    </div>
  );
};

export default Meetingsetup;
