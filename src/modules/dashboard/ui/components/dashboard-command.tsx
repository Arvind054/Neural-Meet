import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command"
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch,SetStateAction, useState } from "react"
import { useTRPC } from "@/trpc/client";
import { GeneratedAvatar } from "@/components/generated-avatar";

interface Props{
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({open, setOpen}:Props)=>{
    const router = useRouter();
    const [search, setSearch] = useState("");
    const trpc = useTRPC();

    const meetings = useQuery(trpc.meetings.getMany.queryOptions({
        search,
        pageSize: 100,
    }));
    const agents = useQuery(trpc.agents.getMany.queryOptions({
        search, pageSize: 100,
    }))
    return (
        <CommandResponsiveDialog open = {open} onOpenChange={setOpen} shouldFilter = {false}>
            <CommandInput placeholder="Find a meeting or agent..." value={search} onValueChange={(val)=>setSearch(val)}/>
            <CommandList>
                <CommandGroup heading = "Meetings">
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm"> No Meetings Found</span>
                </CommandEmpty>
                {meetings.data?.items.map((meeting)=>(
                    <CommandItem  onSelect={()=>{router.push(`/meetings/${meeting.id}`); setOpen(false)}} key={meeting.id}> {meeting.name}
                     </CommandItem>
                ))}
                </CommandGroup>
                  <CommandGroup heading = "Agents">
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm"> No Agents Found</span>
                </CommandEmpty>
                {agents.data?.items.map((agent)=>(
                    <CommandItem  onSelect={()=>{router.push(`/agents/${agent.id}`); setOpen(false)}} key={agent.id}> 
                    <GeneratedAvatar seed={agent.name} variant="botttsNeutral" className="size-5"/>
                    {agent.name}
                     </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    )
}