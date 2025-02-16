import { axiosIntance } from '@/lib/axiosInstant';
import useServer from '@/store/useServer';
import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Loading = ({children}) => {
    const [load , setLoad] = useState(true) ;
    // const [loadOn , setLoadOn] = useState() ;


    // setLoadOn(localStorage.getItem("loading"))
    useEffect(() => {
        const getAuth =async() => {
            // setLoad(true);
            try {
                await axiosIntance.get("/user/user")
            } catch (error) {
                
            }
            finally {
                setTimeout(() => {
                    setLoad(false);
                }, 2000);
            }
        }
        getAuth();
    },[])

    useEffect(() => {
        const getAuth =async() => {
            // setLoad(true);
            try {
                await axiosIntance.get("/user/user")
            } catch (error) {
                
            }
            finally {
                setTimeout(() => {
                    setLoad(false);
                }, 2000);
            }
        }
        getAuth();
    },[localStorage.getItem("loading")])
  if(load) {
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
