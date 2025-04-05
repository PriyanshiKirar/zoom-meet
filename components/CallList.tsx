"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endCalls, upcomingCalls, isLoading, callrecordings } = useGetCalls();
  const router = useRouter();
  const [recordings, setrecordings] = useState<CallRecording[]>([])
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endCalls;
      case "recordings":
        return recordings;
        case "upcoming":
        return upcomingCalls
      default:
       return [];
    }
  };
  return <div>CallList</div>;
};

export default CallList;
