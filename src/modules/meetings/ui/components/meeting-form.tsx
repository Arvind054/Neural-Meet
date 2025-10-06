import { useTRPC } from "@/trpc/client";
import {MeetingGetOne} from './../../types'
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
    onSuccess?:(id?: string)=> void;
    onCancel? :()=>void;
    initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
    onSuccess,
    onCancel,
    initialValues
}: MeetingFormProps)=>{
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [agentSearch, setAgentSearch] = useState("");
    const [openNewAgentDialog,setOpenNewAgentDialog] = useState(false);
    const agents = useQuery(trpc.agents.getMany.queryOptions({pageSize: 100, search: agentSearch}));

   
    const createMeeting = useMutation(
        trpc.meetings.create.mutationOptions({
            onSuccess: async(data)=>{
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}),);
             
                onSuccess?.(data.id);
            },
            onError: (error)=>{
                toast.error(error.message);
            },
        }),
    );
    const updateMeeting = useMutation(
        trpc.meetings.update.mutationOptions({
            onSuccess: async()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}),);
                if(initialValues?.id){
                    await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({id: initialValues.id}))
                }
                onSuccess?.();
            },
            onError: (error)=>{
                toast.error(error.message);
            },
        }),
    );

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver : zodResolver(meetingsInsertSchema),
         defaultValues:{
            name:initialValues?.name ?? "",
            agentId:initialValues?.agentId ?? "",
         }
    });
    const isEdit = !!initialValues?.id;
    const isPending = updateMeeting.isPending || createMeeting.isPending;

    const onSubmit = (values:z.infer<typeof meetingsInsertSchema>)=>{
        if(isEdit){
            updateMeeting.mutate({...values, id: initialValues.id});
        }else{
            createMeeting.mutate(values);
        }
    };

    return (
        <>
        <NewAgentDialog open = {openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
        <Form {...form}>
           <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
             <FormField name="name" control = {form.control}
             render={({field})=>{
                return (<FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Carrier Giudance Session"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>)
             }}/>
          
             <FormField name="agentId" control = {form.control}
             render={({field})=>{
                return (<FormItem>
                    <FormLabel>Agent</FormLabel>
                    <FormControl>
                        <CommandSelect
                         options = {(agents.data?.items ?? []).map((agent)=>({
                            id: agent.id,
                            value: agent.id,
                            children: (<div className="flex items-center gap-x-2">
                               <GeneratedAvatar variant='botttsNeutral' seed={agent.name} className='border size-6'/>
                               <span>{agent.name}</span>
                            </div>)
                         }))}
                         onSelect = {field.onChange}
                         onSearch = {setAgentSearch}
                         value = {field.value}
                         placeholder="Select an Option"/>
                    </FormControl>
                    <FormDescription>
                        Not Found what You&apos;re looking for?{" "}
                         <Button type="button" className="text-primary hover:underline"
                         variant='link'
                        onClick={()=>setOpenNewAgentDialog(true)}>Create new Agent</Button>
                    </FormDescription>
                    <FormMessage/>
                </FormItem>)
             }}/>
          
             <div className="flex justify-between gap-x-2">
                {onCancel && (
                    <Button variant="ghost" disabled={isPending} type="button" onClick={()=>onCancel()}>Cancel </Button>
                )}
                <Button disabled={isPending} type="submit">{isEdit ? "Update": "Create"}</Button>
             </div>
           </form>
        </Form>
        </>
    )
}