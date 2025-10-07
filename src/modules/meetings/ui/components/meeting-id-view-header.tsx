import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent} from "@/components/ui/dropdown-menu";
import { ChevronRightIcon, TrashIcon, MoreVerticalIcon, PencilIcon} from "lucide-react";
import Link from "next/link";
interface Props {
    meetingId: string;
    meetingName: string;
    onEdit: () => void;
    onRemove: () => void;
}

export const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                           <Link href="/agents">My Meetings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                    <ChevronRightIcon/>
                     </BreadcrumbSeparator>
                     <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
                           <Link href={`/agents/${meetingId}`}>{meetingName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                   
                </BreadcrumbList>
            </Breadcrumb>
            {/* Withoue modal = false the dialog that this dropdown opens cause the website to get stuck or unclickable */}
            <DropdownMenu modal={false}>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost">
                   <MoreVerticalIcon/>
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 <DropdownMenuItem onClick={onEdit}>
                    <PencilIcon className="size-4 text-black"/>
                    Edit
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={onRemove}>
                    <TrashIcon className="size-4 text-black"/>
                    Delete
                 </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}