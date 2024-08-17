'use client';
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
    const [isMicCamToggeledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall();
    if (!call) throw new Error("Use call must be used within strean calls")
    useEffect(() => {
        if (isMicCamToggeledOn) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        else {
            call?.camera.enable();
            call?.microphone.enable();
        }

    }, [isMicCamToggeledOn, call?.camera, call?.microphone])
    return (
        <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>set up</h1>
            <VideoPreview />
            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center gap-2 font-medium'>
                    <input
                        type='checkbox'
                        checked={isMicCamToggeledOn}
                        onChange={(e) => { setIsMicCamToggledOn(e.target.checked) }}
                    />
                    Join with mic and camera on
                </label>
                <DeviceSettings />
            </div>
            <button className='rounded-md bg-green-600 px-4 py-2.5' onClick={() => { call.join(); setIsSetupComplete(true) }}>Join Meeting</button>
        </div>
    )
}

export default MeetingSetup
