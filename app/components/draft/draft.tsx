"use client";

import logo from "../../../public/logo.png";
import Image from "next/image";
import MarkdownView from "react-showdown";
import { useDraft } from "@/app/contexts/DraftProvider";

export default function Draft() {
  const { lastDraft } = useDraft();

  function defaultText() {
    return (
      <div className="bg-marfim rounded-lg overflow-hidden w-full h-full">
        <div className="p-4 px-8 pb-20 overflow-y-auto h-full w-full text-center">
          <Image 
            className="my-20 mb-auto mx-auto"
            src={logo} 
            alt="Logo Tarsila" 
          />
          <h2 className="text-2xl leading-[26px] text-laranja max-w-[70%] my-8 mx-auto italic font-bold">
            A elaboração de projetos em um novo patamar
          </h2>
        </div>
      </div>
    );
  }

  return lastDraft ? (
    <div className="bg-marfim rounded-lg p-4 px-8 pb-20 overflow-y-auto w-full">
      <MarkdownView
        className="markdown"
        markdown={lastDraft}
        options={{ tables: true, emoji: true }}
      />
    </div>
  ) : (
    defaultText()
  );
}