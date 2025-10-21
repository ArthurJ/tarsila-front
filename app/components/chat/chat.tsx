"use client";

import ChatInput from "../chat-input/chat-input";
import Dialog from "../dialog/dialog";

export default function Chat() {
  return (
    <div className="bg-marrom-carvao flex flex-col rounded-lg p-4 w-full h-full">
      <Dialog />
      <ChatInput />
    </div>
  );
}