import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
interface newMeetingDialogProps {
    open: boolean;
    onOpenChange: (open:boolean)=>void;
};

export const NewaMeetingDialog = ({open, onOpenChange}:newMeetingDialogProps)=>{
   const router = useRouter();
     return (
        <ResponsiveDialog title="New Meeting" description="Create a New Meeting" open={open} onOpenChange={onOpenChange}>
             <MeetingForm onSuccess={(id)=>{
               onOpenChange(false);
               router.push(`/meetings/${id}`)
            }}
                onCancel={()=>onOpenChange(false)}/>
        </ResponsiveDialog>
     )
}