import { useUser } from '@clerk/clerk-react';
import { LoaderCircle } from 'lucide-react';
import React from 'react'

const Loading = ({children}) => {
    const {isLoaded} = useUser()
  if(!isLoaded) {
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-zinc-800'>
            <LoaderCircle size={26} className='animate-spin text-emerald-600' />
        </div>
    )
  }
  else {
    return (
        <div>
            {children}
        </div>
    )
  }
}

export default Loading
