import { AgentsView, AgentsViewError, AgentsViewLaoding } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import {ErrorBoundary} from 'react-error-boundary';
const page = async()=>{
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback = {<AgentsViewLaoding/>}>
            <ErrorBoundary fallback={<AgentsViewError/>}>
        <AgentsView></AgentsView>
        </ErrorBoundary>
        </Suspense>
        </HydrationBoundary>
    )
}

export default page;