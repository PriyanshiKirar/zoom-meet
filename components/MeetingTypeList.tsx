"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker'
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "isSchduleMeeting" | "isJoinMeeting" | "isInstantMeeting" | "undefined"
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [valuse, setvaluse] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [calDetails, setcalDetails] = useState<Call>();

  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    if (!valuse.dateTime) {
      toast({
        title: "Please select a date and time",
      });
      return;
    }
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to creat call");
      const startsAt =
        valuse.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = valuse.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setcalDetails(call);
      if (!valuse.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };
  const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calDetails?.id}`
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
      {!calDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Creating Meeting"
          className="text-center"
          buttonText="Shcedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col  gap-2.5">
            <label className="text-base text-normal leading-[22px] text-[#ECF0FF]">
              Add a description
            </label>
            <Textarea className="
            border-none bg-[#252A41] 
            focus-visible:ring-0 
            focus-visible:ring-offset-0 resize-none "
            onChange={(e)=>{
              setvaluse({...valuse,description:e.target.value})
            }} />
          </div>
          <div className="flex w-full flex-col gap-2.5">
          <label className="text-base text-normal leading-[22px] text-[#ECF0FF]">
          Selcet Date and Time
            </label>
            <ReactDatePicker 
            selected={valuse.dateTime}
            onChange={(date)=>setvaluse({...valuse,dateTime:date!})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d ,yyyy h:mm aa"
            className="w-full rounded bg-[#252A41] p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchduleMeeting"}
          onClose={() => setmeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({title:'Link copied'})
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setmeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
