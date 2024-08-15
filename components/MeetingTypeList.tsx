//import React from 'react'
'use client'

import { useState } from "react"
import HomeCards from "./HomeCards"
import { useRouter } from "next/navigation"


const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isInstantMeeting' | 'isJoiningMeeting' | undefined>()
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCards
                img="/icons/add-meeting.svg"
                title="New meeting"
                description="start an instant meeting"
                handleClick={() => { setMeetingState('isJoiningMeeting') }}
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
        </section>
    )
}

export default MeetingTypeList
