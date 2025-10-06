"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useLoader } from './contexts/LoaderProvider'
import { Timestamp } from './components/Timestamp';
import Button from './components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

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

          {/* Pricing Section */}
          <div className="mb-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tarsila-burnt-orange mb-4">
                Planos Tarsila
              </h2>
              <p className="text-lg text-tarsila-olive-dark">
                Escolha o plano ideal para transformar suas ideias em projetos culturais
              </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Plano Do Sonho ao Projeto */}
              <PricingCard
                title="Do Sonho ao Projeto"
                subtitle="Porta de entrada"
                price="R$ 449"
                installments="12x de R$ 39,92"
                description="1 projeto cultural completo"
                features={[
                  'Nome do Projeto',
                  'Proponente',
                  'Segmento Cultural',
                  'Resumo do Projeto',
                  'Justificativa',
                  'Objetivos (geral e específicos)',
                  'Contrapartidas Sociais',
                  'Acessibilidade',
                  'Estrutura de Execução',
                  'Cronograma de Realização',
                  'Orçamento Detalhado',
                  '5 interações adicionais',
                  '1 portfólio individual',
                  '1 guia de orientação',
                ]}
                note="Valor à vista pode ser dividido entre até 5 usuários (R$ 89,80/cada)"
              />

              {/* Plano Portfólio */}
              <PricingCard
                title="Portfólio"
                subtitle="Mais projetos, mais colaboração"
                price="R$ 1.212,30"
                installments="12x de R$ 113,75"
                description="3 projetos culturais completos"
                features={[
                  'Tudo do plano anterior',
                  '3 projetos completos',
                  '10 interações adicionais por projeto',
                  '1 painel de projetos',
                  '1 portfólio individual',
                  '1 guia de orientação para todos os projetos',
                ]}
                note="Valor à vista pode ser dividido entre até 5 usuários (R$ 242,46/cada)"
                highlighted
                badge="Popular"
              />

              {/* Plano Trupe */}
              <PricingCard
                title="Trupe"
                subtitle="Para grupos e coletivos"
                price="R$ 1.745"
                installments="12x de R$ 162,00"
                description="5 projetos culturais completos"
                features={[
                  'Tudo do plano anterior',
                  '5 projetos completos',
                  '20 interações adicionais por projeto',
                  '1 painel de projetos',
                  '5 portfólios individuais',
                  '1 guia de orientação',
                  'Suporte humanizado por projeto',
                ]}
                note="Valor à vista pode ser dividido entre até 5 usuários (R$ 349/cada)"
              />
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
            <div>
              <Link href="/login">
                <Button size="lg">Entrar com Google</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {/* <div className="text-center mb-20">
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
        </div> */}
      </main>

      {/* Footer */}
      <footer className="border-t border-tarsila-olive-light/20 bg-tarsila-olive-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <p className="text-sm text-white">
              © <Timestamp /> Tarsila. Democratizando o acesso à elaboração de projetos culturais.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface PricingCardProps {
  title: string
  subtitle?: string
  price: string
  installments: string
  description: string
  features: string[]
  note: string
  highlighted?: boolean
  badge?: string
}

function PricingCard({
  title,
  subtitle,
  price,
  installments,
  description,
  features,
  note,
  highlighted = false,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl p-8 relative flex flex-col ${
        highlighted
          ? 'bg-gradient-to-br from-tarsila-burnt-orange/10 to-tarsila-olive-light/10 border-2 border-tarsila-burnt-orange shadow-lg'
          : 'bg-white border border-tarsila-olive-light/30 shadow-sm'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 bg-tarsila-burnt-orange text-tarsila-ivory text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-tarsila-coffee mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-tarsila-olive-dark italic">{subtitle}</p>
        )}
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-tarsila-sienna mb-1">
          {price}
        </div>
        <div className="text-sm text-tarsila-olive-dark">
          à vista
        </div>
        <div className="text-xs text-tarsila-olive-dark mt-1">
          ou {installments}
        </div>
      </div>

      <p className="text-center text-tarsila-coffee font-medium mb-6 pb-6 border-b border-tarsila-olive-light/30">
        {description}
      </p>

      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-tarsila-olive-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-tarsila-olive-dark">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mb-6 mt-auto">
        <p className="text-xs text-tarsila-olive-dark italic bg-tarsila-olive-dark-200 p-3 rounded-lg">
          {note}
        </p>
      </div>

      <Link href="/login" className="block">
        <Button 
          variant={highlighted ? "primary" : "outline"}
          size="lg"
          className="w-full"
        >
          Começar Agora
        </Button>
      </Link>
    </div>
  )
}