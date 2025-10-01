"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { session } from "@/DB/schema";
import { useRouter } from "next/navigation";


export const HomeView = ()=>{
   const router = useRouter();

    return (
        <div className="flex flex-col p-4 gap-y-4">
            <p>
               Logged in as {session.userAgent.name}
            </p>
            <Button onClick={()=>authClient.signOut({fetchOptions:{
                onSuccess: ()=>router.push("/sign-in")
            }})}>signOut</Button>
        </div>
    )
}