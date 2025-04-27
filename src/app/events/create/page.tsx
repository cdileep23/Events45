import EventForm from '@/components/extracomponents/EventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const Page = async() => {
  const { userId } = await auth()
  
  return (
    <section className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 py-8 sm:py-12'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-center sm:text-left text-gray-900'>Create Event</h1>
          <p className='mt-2 text-gray-700 text-center sm:text-left'>Fill out the form below to create a new event</p>
        </div>
        
        <div className='bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 md:p-8'>
          <EventForm userId={userId} type="Create"/>
        </div>
      </div>
    </section>
  )
}

export default Page