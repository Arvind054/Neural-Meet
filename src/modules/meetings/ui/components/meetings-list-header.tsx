"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { useState } from "react"
import { DEFAULT_PAGE } from "@/constants"
import { NewaMeetingDialog } from "./new-meeting-dialog"

export const MeetingsListHeader = ()=>{
    const [isDialogOpen, setDialogOpen] = useState(false);

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
           <div className="flex items-center gap-x-2 p-1">
                 
           </div>
        </div>
        </>
    )
}