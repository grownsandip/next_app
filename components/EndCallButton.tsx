"user client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
const EndCallButton = () => {
    const call=useCall();
    const router=useRouter();
    const {useLocalParticipant}=useCallStateHooks();
    const localParticipant=useLocalParticipant();
    const isMeetingOwner=localParticipant && call?.state.createdBy && localParticipant?.userId===call.state.createdBy.id;
    if(!isMeetingOwner)return;
  return (
    <Button onClick={async ()=>{
        await call.endCall();
        router.push('/')
    }} className='bg-red-500 px-2 py-2 rounded-md font-bold'>
        End Call for Everyone
    </Button>
  )
}

export default EndCallButton
