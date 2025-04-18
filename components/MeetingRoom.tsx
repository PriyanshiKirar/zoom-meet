"use client";

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
// 'personal'=> !'personal'=>!false=>true
// undefined=> !undefined=?true => false
const MeetingRoom = () => {
  const searchParams=useSearchParams()
const isPersonalRoom=!!searchParams.get('personal')
  const [Layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setshowParticipants] = useState(false);

  const {useCallCallingState} =useCallStateHooks();
  const calllingState=useCallCallingState();
  if(calllingState !== CallingState.JOINED) return
  <Loader/>
  const CallLayout = () => {
    switch (Layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white bg-[#161925]">
      <div className="flex relative  sixe-full items-center justify-center">
        <div className="flex sixe-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)]  hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-[#1C1F2E] bg-[#1C1F2E]  text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => {
                    setLayout(item.toLocaleLowerCase() as CallLayoutType);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-[#1C1F2E]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=>setshowParticipants((prev)=> !prev)}>
<div className="curson-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg[#4c535b]">
<Users size={20} className="twxt-white "/>
</div>
        </button>
        {!isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  );
};

export default MeetingRoom;
