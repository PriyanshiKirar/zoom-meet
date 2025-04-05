import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls=()=>{
    const [calls, setcalls] = useState<Call[]>([]);
    const [isLoading, setisLoading] = useState(false)
    const client =useStreamVideoClient();
    const {user}=useUser();
    useEffect(()=>{
const loadCall=async () => {
  if(!client || !user?.id)   return;
  setisLoading(true);
  try {
    const {calls}=await client.queryCalls({
        sort:[{field:'starts_at',direction:-1}],
        filter_conditions:{
            starts_at:{$exists:true},
            $or:[
                {
                    created_by_user_id:user.id
                },
                {members:{$in:[user.id]}}
            ]
        }
    });
    setcalls(calls);
  } catch (error) {
    console.log(error);
    
  } finally{
    setisLoading(false)
  }
}
loadCall();

    },[client,user?.id]);
    const now = new Date();

    const endCalls = calls.filter(call => {
      const { startsAt, endedAt } = call.state;
    
      return (startsAt && new Date(startsAt) < now) || !!endedAt;
    });
    
  const upcomingCalls=calls.filter(call => {
    const { startsAt } = call.state;
  
    return startsAt && new Date(startsAt) > now 
  })
 

  return{
      endCalls,
   upcomingCalls,
   isLoading,
  callrecordings:calls,
  }
}
