//@ts-nocheck
'use client';
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording, CallRecordingList } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from './ui/use-toast';



const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
    const { toast } = useToast();
    const [recordings, setRecordings] = useState<CallRecording[]>([])
    const router = useRouter();
    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls
            case 'recording':
                return recordings
            case 'upcoming':
                return upcomingCalls
            default:
                return []
        }
    }
    const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return 'no previous calls';
            case 'recording':
                return 'no recordings available';
            case 'upcoming':
                return 'no upcoming calls';
            default:
                return '';
        }
    }
    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))
                const recordings = callData.filter(call => call.recordings.length > 0)
                    .flatMap(call => call.recordings)
                setRecordings(recordings);
            } catch (error) {
                toast({ title: "Try again later" });
            }
        }
        if (type === 'recording') fetchRecordings();

    }, [type, callRecordings]);
    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    if (isLoading) return <Loader />
    return (
        <div className='flex flex-col gap-5 '>
            {calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
                <MeetingCard
                    key={(meeting as Call).id}
                    icon={type === 'ended' ? "/icons/previous.svg" : 'upcoming' ? '/icons/upcoming.svg' : '/icons/recordings.svg'}
                    title={(meeting as Call).state?.custom?.description?.substring(0, 26) || meeting?.filename?.substring(0, 20) || 'Personal Meeting'}
                    date={meeting.state?.startsAt.toLocaleString() || meeting.start_time.toLocaleString()}
                    isPreviousMeeting={type === 'ended'}
                    buttonIcon={type === 'recording' ? "/icons/play.svg" : undefined}
                    handleClick={type === 'recording' ? () => { router.push(`${meeting.url}`) } : () => { router.push(`/meeting/${meeting.id}`) }}
                    link={type == 'recording' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                    buttonText={type === 'recording' ? 'Play' : 'Start'}
                />
            )) : (
                <h1 className='text-2xl font-bold text-white'>{noCallsMessage}</h1>
            )
            }
        </div>
    )
}

export default CallList
