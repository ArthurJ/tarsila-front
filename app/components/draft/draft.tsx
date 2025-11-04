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
            className="my-20 mb-10 mx-auto" 
            src={logo} 
            alt="Logo Tarsila" 
          />
          <h2 className="text-2xl leading-[26px] text-laranja max-w-[70%] my-8 mx-auto italic font-bold">
            A elaboração de projetos em um novo patamar
          </h2>
          <p className="text-[13px] leading-4 text-verde-oliva-escuro max-w-[420px] my-3 mx-auto">
            Acreditamos na cocriação como a melhor forma de promover a inclusão de
            empreendedores culturais. Cada um se beneficia do todo, ao mesmo tempo
            em que oferece a sua contribuição, ampliando, diversificando e
            fortalecendo a comunidade.
          </p>
          <p className="text-[13px] leading-4 text-verde-oliva-escuro max-w-[420px] my-3 mx-auto">
            A Tarsila surgiu para democratizar o acesso à elaboração de projetos,
            com o uso de tecnologias generativas de ponta.
          </p>
          <h2 className="text-2xl leading-[26px] text-laranja max-w-[70%] my-8 mx-auto italic font-bold">
            Tecnologia a serviço da colaboração
          </h2>
          <p className="text-[13px] leading-4 text-verde-oliva-escuro max-w-[420px] my-3 mx-auto">
            Tarsila te ajuda a colocar em palavras o trabalho que você ou o seu
            grupo já realizam ou querem realizar. O resultado é a geração de um
            pré-projeto com objetivo, justificativa e sugestão de orçamento,
            concebido a partir das melhores práticas.
          </p>
          <p className="text-[13px] leading-4 text-verde-oliva-escuro max-w-[420px] my-3 mx-auto">
            As ferramentas de LLM (Large Language Model) utilizadas pela CocrIA
            são treinadas constantemente sobre os termos mais prováveis empregados
            em cada tipo de projeto e, a partir disto, produzem um texto-base
            próprio ao qual você poderá acrescentar as suas próprias palavras.
          </p>
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