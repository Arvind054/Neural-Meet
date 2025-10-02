"use client"
import { Dialog, DialogContent, DialogHeader,DialogTitle, DialogDescription } from "./ui/dialog";
import { Drawer,DrawerContent,DrawerHeader,DrawerTitle,DrawerDescription } from "./ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResponsiveDialogProps{
    title: string;
    description: string;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (opne:boolean)=>void;
};

export const ResponsiveDialog = ({title,description,children, open, onOpenChange}:ResponsiveDialogProps)=>{
   const isMobile = useIsMobile();
   if(isMobile){
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
             <DrawerContent>
                <DrawerTitle >
                  {title}
                </DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
                <div className="p-4">{children}</div>
             </DrawerContent>
        </Drawer>
    )
   }
   return (
    <Dialog open = {open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                   {description}
                </DialogDescription>
            </DialogHeader>
            {children}
          </DialogContent>
    </Dialog>
   )
}