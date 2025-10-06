"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useLoader } from './contexts/LoaderProvider'
import { Timestamp } from './components/Timestamp';
import Button from './components/ui/Button';

export default function Homepage() {
  const { hideLoader } = useLoader();

  useEffect(() => {
    hideLoader();
  }, [hideLoader]);

  return (
    <div className="min-h-screen flex flex-col bg-tarsila-ivory">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="mb-12">
              <Image 
                src="/logo.png" 
                alt="Logo Tarsila" 
                width={120} 
                height={120}
                className="mx-auto mb-8"
                priority
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-tarsila-coffee tracking-tight">
              A elaboração de projetos <br className="hidden sm:block" />
              <span className="text-tarsila-burnt-orange">
                em um novo patamar
              </span>
            </h1>
            
            <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-tarsila-olive-dark leading-relaxed">
              Acreditamos na cocriação como a melhor forma de promover a inclusão de 
              empreendedores culturais. Cada um se beneficia do todo, ao mesmo tempo 
              em que oferece a sua contribuição.
            </p>
            
            <div className="mt-12">
              <Link href="/login">
                <Button size="lg">Entrar com Google</Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-tarsila-burnt-orange mb-6">
              Tecnologia a serviço da colaboração
            </h2>
            <div className="space-y-6">
              <p className="mt-8 max-w-2xl mx-auto text-md sm:text-lg text-tarsila-olive-dark leading-relaxed">
                Tarsila te ajuda a colocar em palavras o trabalho que você ou o seu 
                grupo já realizam ou querem realizar. O resultado é a geração de um 
                pré-projeto com <strong>objetivo</strong>, <strong>justificativa</strong> e 
                sugestão de <strong>orçamento</strong>, concebido a partir das melhores práticas.
              </p>
              <p className="mt-8 max-w-2xl mx-auto text-md sm:text-lg text-tarsila-olive-dark leading-relaxed">
                As ferramentas de <strong>LLM (Large Language Model)</strong> utilizadas pela CocrIA 
                são treinadas constantemente sobre os termos mais prováveis empregados 
                em cada tipo de projeto e, a partir disto, produzem um texto-base 
                próprio ao qual você poderá acrescentar as suas próprias palavras.
              </p>
              <p className="mt-8 max-w-2xl mx-auto text-md sm:text-lg text-tarsila-olive-dark leading-relaxed">
                A Tarsila surgiu para democratizar o acesso à elaboração de projetos, 
                com o uso de tecnologias generativas de ponta.
              </p>
            </div>
          </div>
            
          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-tarsila-olive-light/10 to-tarsila-burnt-orange/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-tarsila-coffee mb-4">
              Vamos transformar suas ideias em projetos?
            </h2>
            <p className="text-tarsila-olive-dark mb-8 max-w-2xl mx-auto">
              Amplie, diversifique e fortaleça sua comunidade com a Tarsila. 
              Comece a criar projetos culturais de forma colaborativa hoje mesmo.
            </p>
            <div >
              <Link href="/login">
                <Button size="lg">Entrar com Google</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-tarsila-olive-light/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-tarsila-olive-dark">
              © <Timestamp /> Tarsila. Democratizando o acesso à elaboração de projetos culturais.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}