import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
interface newAgentDialogProps {
    open: boolean;
    onOpenChange: (open:boolean)=>void;
};

export const NewAgentDialog = ({open, onOpenChange}:newAgentDialogProps)=>{
     return (
        <ResponsiveDialog title="New Agent" description="Create a New Agent" open={open} onOpenChange={onOpenChange}>
             <AgentForm onSuccess={()=>onOpenChange(false)}
                onCancel={()=>onOpenChange(false)}/>
        </ResponsiveDialog>
     )
}