
import React from 'react'
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
type Props = {}

async function page({}: Props) {
   const session = await  auth.api.getSession({
      headers: await headers(),
    })
    if(!!session){
      redirect("/sign-in");
    }
  return ( 
    <SignUpView/>
  )
}

export default page;