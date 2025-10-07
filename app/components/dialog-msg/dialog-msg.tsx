"use client";

import MarkdownView from "react-showdown";
import { MSG_TYPES } from "@/app/services/services";

interface DialogMsgProps {
  msgType: MSG_TYPES;
  message: string;
  timeStamp: string;
}

export default function DialogMsg(props: Readonly<DialogMsgProps>) {
  const isAIMessage = props.msgType === MSG_TYPES.AI_TEXT;
  
  return (
    <div
      className={`
        rounded-lg p-4 text-marfim mb-4 max-w-[90%]
        ${isAIMessage 
          ? 'bg-verde-oliva self-start' 
          : 'bg-laranja self-end mr-4'
        }
      `}
    >
      <MarkdownView
        className="markdown"
        markdown={props.message}
        options={{ tables: true, emoji: true }}
      />

      <br />
      <div className="min-w-[160px] w-[calc(100%-16px)] text-[11px] ml-4 mb-2 text-marfim text-right opacity-50">
        {props.timeStamp}
      </div>
    </div>
  );
}