"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = ()=>{
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useMeetingsFilter();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({...filters}));
    return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
          <DataTable data = {data.items} columns={columns}
           onRowClick={(row)=> router.push(`/meetings/${row.id}`)}/>
          <DataPagination 
          page={filters.page}
          totalPages={data.totalPages}
          onPageChange={(page)=>setFilters({page})}/>
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