import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex flex-col text-white size-full gap-5 justify-between '>
    <h1 className='text-3xl font-bold'>Previous Meetings
    </h1>
    <CallList  type='ended'/>
  </section>
  )
}

export default Previous
