"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O EventoFacil é realmente gratuito?",
      answer:
        "Sim! O plano básico do EventoFacil é totalmente gratuito para eventos com até 50 convidados. Para necessidades maiores, oferecemos planos pagos com recursos adicionais.",
    },
    {
      question: "Como os convidados recebem o convite?",
      answer:
        "Os convidados podem receber o convite de três formas: por e-mail, através de um link compartilhável que você pode enviar pelo WhatsApp ou outras plataformas, ou ainda por um código QR exclusivo do seu evento.",
    },
    {
      question: "Posso personalizar os convites?",
      answer:
        "Absolutamente! Oferecemos diversos templates para personalização, permitindo que você adicione fotos, cores e textos personalizados. Nos planos Premium e Business, há ainda mais opções de personalização.",
    },
    {
      question: "É possível criar uma lista de presentes ou contribuições?",
      answer:
        "Sim, você pode criar listas detalhadas de contribuições, onde os convidados podem escolher o que levar para o evento. Isso é ideal para churrascos, festas colaborativas ou até mesmo listas de presentes.",
    },
    {
      question: "Como faço para enviar lembretes aos convidados?",
      answer:
        "O EventoFacil permite configurar lembretes automáticos que podem ser enviados em datas específicas antes do evento. Você também pode enviar mensagens personalizadas a qualquer momento.",
    },
    {
      question: "Posso integrar o EventoFacil com meu calendário?",
      answer:
        "Sim! O EventoFacil integra-se perfeitamente com Google Calendar, Apple Calendar e Microsoft Outlook, permitindo que tanto você quanto seus convidados adicionem o evento ao calendário com um único clique.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Tudo o que você precisa saber sobre o EventoFacil
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left no-underline text-lg cursor-pointer font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600">Não encontrou o que procurava?</p>
          <a
            href="/contact"
            className="text-blue-600 font-medium hover:underline"
          >
            Entre em contato com nossa equipe
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
