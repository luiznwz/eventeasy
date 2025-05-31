"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "next-view-transitions";

const PricingSection = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      description: "Perfeito para eventos pequenos e ocasionais",
      features: [
        "Até 50 convidados por evento",
        "Até 3 eventos ativos",
        "Convites básicos por e-mail e link",
        "Gerenciamento de confirmações",
        "Lista de contribuições simples",
        "Lembretes automáticos básicos",
      ],
      cta: "Começar grátis",
      popular: false,
    },
    {
      name: "Premium",
      price: "R$ 19,90",
      period: "/mês",
      description: "Ideal para quem organiza eventos regulares",
      features: [
        "Até 200 convidados por evento",
        "Eventos ilimitados",
        "Convites personalizáveis",
        "Gerenciamento avançado de grupos",
        "Lista de contribuições detalhada",
        "Lembretes personalizados",
        "Estatísticas avançadas",
        "Integração com calendários",
      ],
      cta: "Assinar Premium",
      popular: true,
    },
    {
      name: "Business",
      price: "R$ 49,90",
      period: "/mês",
      description: "Para profissionais e empresas",
      features: [
        "Convidados ilimitados",
        "Eventos ilimitados",
        "Marca personalizada nos convites",
        "Múltiplos organizadores",
        "Pesquisas e feedback",
        "API para integrações",
        "Suporte prioritário",
        "Relatórios detalhados exportáveis",
      ],
      cta: "Contato comercial",
      popular: false,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 md:px-12 lg:px-20 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Planos e Preços
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Escolha o plano ideal para suas necessidades
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${
                    plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12">
          Todos os planos incluem 7 dias de teste grátis. Sem compromisso.
          Cancele a qualquer momento.
        </p>
      </div>
    </motion.section>
  );
};

export default PricingSection;
