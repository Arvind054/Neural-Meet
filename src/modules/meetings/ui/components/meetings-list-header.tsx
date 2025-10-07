"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"
import { DEFAULT_PAGE } from "@/constants"
import { NewaMeetingDialog } from "./new-meeting-dialog"
import { MeetingSearchFilter } from "./Meetings-search-filter"
import { StatusFilter } from "./status-filer"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilter } from "../../hooks/use-meetings-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
export const MeetingsListHeader = ()=>{
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [filters, setFilters] = useMeetingsFilter();

    const isAnyFilterModified = !!filters.status || !!filters.search || !!filters.agentId;
    

    const onClearFilters = ()=>{
        setFilters({
            status: null,
            agentId: "",
            search: "",
            page:DEFAULT_PAGE
        })
    };

    return (
        <>
        <NewaMeetingDialog open={isDialogOpen} onOpenChange={setDialogOpen}/>
        <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
           <div className="flex items-center justify-between">
               <h5 className="font-medium text-xl">My Meetings</h5>
               <Button onClick={()=>setDialogOpen(true)}>
                <PlusIcon/>
                New Meeting</Button>
           </div>
           <ScrollArea>
           <div className="flex items-center gap-x-2 p-1">
                 <MeetingSearchFilter/>
                 <StatusFilter/>
                 <AgentIdFilter/>
                 {isAnyFilterModified && <Button variant='outline' onClick={onClearFilters}> Clear
                      <XCircleIcon  className="size-4"/>
                 </Button>}
           </div>
           <ScrollBar orientation={'horizontal'}/>
           </ScrollArea>
        </div>
        </>
    )
}