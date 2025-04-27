
import EventForm from '@/components/extracomponents/EventForm'
import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async() => {
    const {userId}=await auth()
   
  return (
    <section className='max-w-7xl mx-auto px-4 py-4 bg-primary-50'>
        <h1 className='h3-bold text-center sm:left '>Update Event</h1>
        <div>
            <EventForm userId={userId} type="Create"/>
        </div>
    </section>
  )
}

export default page