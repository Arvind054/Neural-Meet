import { useEffect, useState } from "react";
import type {Channel as StreamChannel} from 'stream-chat';
import { useMutation } from "@tanstack/react-query";
import {useCreateChatClient, Chat, Channel, MessageInput, MessageList,Thread, Window} from 'stream-chat-react';
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";

import 'stream-chat-react/dist/css/v2/index.css'
import { trpc } from "@/trpc/server";

type Props = {
    meetingId: string,
    meetingName: string,
    userId: string,
    userName: string, 
    userImage: string | undefined
};


export const ChatUI = ({meetingId, meetingName, userId, userName, userImage}: Props)=>{
    const trps = useTRPC();
    const {mutateAsync: generateToken}= useMutation(trpc.meetings.generateChatToken.mutationOptions());
    const [channel, setChannel] = useState<StreamChannel>();

    const client = useCreateChatClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
        tokenOrProvider:generateToken,
        userData:{
            id: userId,
            name: userName,
            image: userImage 
        }
    });

    useEffect(()=>{
        if(!client)return ;
        const channel = client.channel("messaging", meetingId, {
            members: [userId],
        });
        setChannel(channel);

    }, [client, meetingId, meetingName,userId]);


    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <Chat client={client}>
                <Channel channel={channel}>
                    <Window>
                        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
                           <MessageList/>
                        </div>
                        <MessageInput/>
                    </Window>
                    <Thread/>
                </Channel>
            </Chat>
        </div>
    )
}



