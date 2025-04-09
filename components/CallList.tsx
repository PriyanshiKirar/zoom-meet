"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endCalls, upcomingCalls, isLoading, callrecordings } = useGetCalls();
  const router = useRouter();
  const [recordings, setrecordings] = useState<CallRecording[]>([]);
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previos Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming";
      default:
        return "";
    }
  };
  const calls = getCalls();
  const noCallMeassges = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => <MeetingCard
        key={(meeting as Call).id}
        icon=''
        title=''
        date=''
        isPreviousMeeting=''
        buttonIcon1=''
        handleClick=''
        link=''
        buttonText=''
        />
      )) : (
        <h1>{noCallMeassges}</h1>
      )}
    </div>
  );
};

export default CallList;
