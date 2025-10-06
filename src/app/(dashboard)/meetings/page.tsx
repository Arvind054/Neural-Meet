import { auth } from '@/lib/auth';
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header';
import { MeetingsView, MeetingsViewError, MeetingsViewLaoding } from '@/modules/meetings/ui/views/meeting-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

type Props = {}

const page = async(props: Props) => {
  const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
    const session = await  auth.api.getSession({
           headers: await headers(),
         })
         if(!session){
           redirect("/sign-in");
         }
  return (
    <>
    <MeetingsListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLaoding/>}>
        <ErrorBoundary fallback={<MeetingsViewError/>}>
   <MeetingsView/>
   </ErrorBoundary>
   </Suspense>
   </HydrationBoundary>
   </>
  )
}
export default page;