"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/DataTable";
import { columns, Payment } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilter } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";
export const AgentsView = ()=>{
    const [filters, setFilters] = useAgentFilter();
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}));
    const router = useRouter();
    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns}
             onRowClick={(row)=>router.push(`/agents/${row.id}`)}/>
             <DataPagination page={filters.page}
             totalPages ={data.totalPages}
             onPageChange = {(page)=>setFilters({page})}/>
            {data.items.length === 0 && 
            <EmptyState title="Create Your First agent"
            description="Create an agent to joint you Meetings. Each agent will follow your instructions and can interact with particiapnts during the call."/>}
        </div>
    )
}

export const AgentsViewLaoding = ()=>{
        return (<LoadingState title="Loading Agents" description="This may take a few seconds"/>)
}
export const AgentsViewError = ()=>{
        return (<ErrorState title="Failed to load Agents" description="Please Try again."/>)
}