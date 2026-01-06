"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { CompletedState } from "../completed-state";

type Props = {
    meetingId: string,
};

export const MeetingIdView = ({meetingId}:Props)=>{
    const router = useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
    const [RemoveConfirmation,confirmRemove] = useConfirm("Are you Sure", "The Floowing action will remove this meeing");
     const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id: meetingId}));
     const removeMeeting = useMutation(trpc.meetings.remove.mutationOptions({
        onSuccess: ()=>{
            queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
            router.push("/meetings");
        },
       
    }));

    const handleRemoveMeeting = async()=>{
        const ok = await confirmRemove();
        if(!ok)return ;
        await removeMeeting.mutateAsync({id:meetingId});
    }
    const isActive = data.status === 'active';
    const isUpcoming = data.status === 'upcoming';
    const isCancelled = data.status ==='cancelled';
    const isCompleted = data.status === 'completed';
    const isProcessing = data.status === 'processing';
   return(
    <>
    <RemoveConfirmation/>
    <UpdateMeetingDialog open={updateMeetingDialogOpen} onOpenChange={setUpdateMeetingDialogOpen}
    initialValues={data}/>
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader 
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={()=>{setUpdateMeetingDialogOpen(true)}}
        onRemove={handleRemoveMeeting}/>
        {isActive && <ActiveState meetingId={meetingId}/>}
        {isUpcoming && <UpcomingState
          meetingId={meetingId} 
          isCancelled = {false}/>}
        {isCancelled && <CancelledState/>}
        {isCompleted && <CompletedState data = {data} />}
        {isProcessing && <ProcessingState/>}
    </div>
    </>
   )
}

export const MeetingIdViewLoading = ()=>{
    return (
        <LoadingState title="Loading Meeting"
        description="This may take a few seconds"/>
    );
}
export const MeetingIdViewError = ()=>{
    return (
        <ErrorState title="Error Loading Meeting"
        description="Please Try again Later"/>
    );
}