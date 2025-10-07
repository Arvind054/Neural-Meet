"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = ()=>{
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
          <DataTable data = {data.items} columns={columns}/>
            {data.items.length === 0 && 
                      <EmptyState title="Create Your First Meeting"
                      description="Schedule a Meeting to connect with Agents. Each Meeting will lets you to connect, share Ideas and interact with the agents in real time."/>}
      </div>
    )  
}

export const MeetingsViewLaoding = ()=>{
        return (<LoadingState title="Loading Meetings" description="This may take a few seconds"/>)
}
export const MeetingsViewError = ()=>{
        return (<ErrorState title="Failed to load Meetings" description="Please Try again."/>)
}