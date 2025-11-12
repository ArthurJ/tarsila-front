"use client";

import Image from "next/image";
import { useState } from "react";
import MarkdownView from "react-showdown";
import logo from "@/public/logo.png";
import { useDraft } from "@/app/contexts/DraftProvider";
import Button from "@/app/components/ui/Button";
import DownloadForm from "../download-form";

export default function Draft() {
  const { lastDraft } = useDraft();
  const [showDownloadForm, setShowDownloadForm] = useState<boolean>(false);

  function handleDownloadForm(): void {
    setShowDownloadForm(!showDownloadForm);
  }

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
    <div className="flex flex-col items-center bg-marfim rounded-lg p-4 px-8 pb-20 overflow-y-auto w-full">
      <MarkdownView
        id="draft"
        className="markdown"
        markdown={lastDraft}
        options={{ tables: true, emoji: true }}
      />
      {showDownloadForm
        ? <DownloadForm setVisibilityAction={setShowDownloadForm} />
        : <Button
          size="sm"
          onClick={() => handleDownloadForm()}
        >Salvar proposta</Button>
      }
    </div>
  ) : (
    defaultText()
  );
};
