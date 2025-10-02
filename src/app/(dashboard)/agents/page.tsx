import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import { AgentsView, AgentsViewError, AgentsViewLaoding } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {ErrorBoundary} from 'react-error-boundary';
const page = async()=>{
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
     const session = await  auth.api.getSession({
        headers: await headers(),
      })
      if(!session){
        redirect("/sign-in");
      }
    return (
        <>
        <AgentsListHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback = {<AgentsViewLaoding/>}>
            <ErrorBoundary fallback={<AgentsViewError/>}>
        <AgentsView></AgentsView>
        </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
        </>
    )
}

export default page;