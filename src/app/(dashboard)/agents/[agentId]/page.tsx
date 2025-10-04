import { AgentIdView, AgentIdViewError, AgentIdViewLaoding } from "@/modules/agents/ui/views/agentId-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params :Promise<{agentId: string}>
};

const page = async({params}:Props) =>{
    const {agentId} = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getOne.queryOptions({id: agentId}));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLaoding/>}>
                <ErrorBoundary fallback={<AgentIdViewError/>}>
                   <AgentIdView agentId={agentId}/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page;