//import React from 'react'
'use client'

import { useState } from "react"
import HomeCards from "./HomeCards"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./ui/use-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from "react-datepicker"
import { set } from "react-datepicker/dist/date_utils"
import { Input } from "./ui/input"

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
    const {toast} =useToast();
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
    const meetingLink=`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCards
                img="/icons/add-meeting.svg"
                title="New meeting"
                description="start an instant meeting"
                handleClick={() => { setMeetingState('isInstantMeeting') }}
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
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
                className="bg-purple-1"
            />
            {!callDetails?(<MeetingModal
                isOpen={meetingState === 'isSchedulingMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Create Meeting'
                handleClick={createMeeting}
                >
                 <div className="flex flex-col gap-2.5">
                    <label className="text-base text-normal leading-[22px] text-white font-semibold">Add a description</label>
                    <Textarea className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e)=>{setValues({...values,description:e.target.value})}}/>
                 </div>
                 <div className="flex w-full flex-col gap-2.5">
                 <label className="text-base text-normal leading-[22px] text-white font-semibold">Select Date and Time</label>
                 <ReactDatePicker
                 selected={values.dateTime}
                 onChange={(date)=>{
                   setValues({...values,dateTime:date!})
                 }}
                 showTimeSelect
                 timeFormat="HH:mm"
                 timeIntervals={15}
                 timeCaption="time"
                 dateFormat="MMMM d,yyyy h:mm aa"
                 className="w-full rounded bg-dark-2 p-2 focus:outline-none"
                 />
                 </div>
                </MeetingModal>
            ):(
                <MeetingModal
                isOpen={meetingState === 'isSchedulingMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Meeting Created'
                className="flex flex-col items-center justify-center"
                handleClick={()=>{
                    navigator.clipboard.writeText(meetingLink)
                    toast({title:'Link Copied'})
                }}
                img="/icons/checked.svg"
                buttonIcon="/icons/copy.svg"
                buttonText="Copy Meeting Link"

            />
            )}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='start an instant meeting'
                className="text-center"
                buttonText='start meeting'
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Type the link here'
                className="text-center"
                buttonText='Join meeting'
                handleClick={()=>router.push(values.link)}
            >
                <Input placeholder="Meeting Link" className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e)=>setValues({...values,link:e.target.value})}
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
