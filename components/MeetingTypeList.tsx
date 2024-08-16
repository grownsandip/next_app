//import React from 'react'
'use client'

import { useState } from "react"
import HomeCards from "./HomeCards"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"

const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isInstantMeeting' | 'isJoiningMeeting' | undefined>()
    const { user } = useUser();
   // console.log(user)
    const client = useStreamVideoClient();
    //console.log(client)
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    const [callDetails,setCallDetails]=useState<Call>();
    const {toast} =useToast()
    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if(!values.dateTime){
                toast({title:"please select a date and time"});
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error("Failed to create a call");
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    }
                }
            })

            setCallDetails(call)
            
            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }
            toast({title:"Meeting created"})
        }
        catch (err) {
            console.log(err);
            toast({
                title:"Failed to create meeting"
            })
        }
    }
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCards
                img="/icons/add-meeting.svg"
                title="New meeting"
                description="start an instant meeting"
                handleClick={createMeeting}
                className="bg-orinage-1"
            />
            <HomeCards
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                handleClick={() => { setMeetingState('isSchedulingMeeting') }}
                className="bg-blue-1"
            />
            <HomeCards
                img="/icons/recordings.svg"
                title="View Recordings"
                description="checkout your recordings"
                handleClick={() => { router.push("/recordings") }}
                className="bg-slate-600"
            />
            <HomeCards
                img="/icons/join-meeting.svg"
                title="Join meeting"
                description="via invitation link"
                handleClick={() => { setMeetingState('isInstantMeeting') }}
                className="bg-purple-1"
            />
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='start an instant meeting'
                className="text-center"
                buttonText='start meeting'
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList
