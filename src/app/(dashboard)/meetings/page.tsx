import { MeetingsView, MeetingsViewError, MeetingsViewLaoding } from '@/modules/meetings/ui/views/meeting-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

type Props = {}

const page = (props: Props) => {
  const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLaoding/>}>
        <ErrorBoundary fallback={<MeetingsViewError/>}>
   <MeetingsView/>
   </ErrorBoundary>
   </Suspense>
   </HydrationBoundary>
  )
}
export default page;