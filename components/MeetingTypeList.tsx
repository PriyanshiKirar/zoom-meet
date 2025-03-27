"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
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
