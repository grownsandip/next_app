import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='flex text-white size-full gap-10 flex-col'>
    <h1 className='text-3xl font-bold'>
    Recordings
    <CallList type="recording"/>
    </h1>
  </section>
  )
}

export default Recordings
