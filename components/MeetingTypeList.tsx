"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isSchduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | "undefined"
  >();
  const createMeeting=()=>{
    
  }
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setmeetingState("isInstantMeeting")}
        className="bg-[#FF742E]"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your  meeting"
        handleClick={() => setmeetingState("isSchduleMeeting")}
        className="bg-[#0E78F9]"
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        handleClick={() => setmeetingState("isJoinMeeting")}
        className="bg-[#F9A90E]"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title=" View Recording"
        description="Check out your recording"
        handleClick={() => router.push("/recordings")}
        className="bg-[#830EF9]"
      />
      <MeetingModal

      isOpen={meetingState==="isInstantMeeting"}
      onClose={()=> setmeetingState(undefined)}
      title="Start an instant meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
