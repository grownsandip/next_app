import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
  const date=new Date()
  const day=(new Intl.DateTimeFormat('en-IN',{dateStyle:"full"})).format(date)
  //console.log(day)
  const time=date.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})
 // console.log(time)
  return (
    <section className='flex text-white size-full gap-10 flex-col'>
     <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
      <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 '>
        <h2 className='glassmorphism max-w-[270px] text-center py-2 rounded text-base font-normal'>Upcoming event at 12:30 pm</h2>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
          <p className='text-lg font-medium lg:text-2xl text-sky-1'>{day}</p>
        </div>
      </div>
     </div>

     <MeetingTypeList/>

    </section>
  )
}

export default Home
