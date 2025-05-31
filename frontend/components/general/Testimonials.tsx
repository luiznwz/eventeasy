"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      content:
        "Organizei meu casamento usando o EventoFacil e foi incrível como consegui gerenciar tudo em um só lugar. Os lembretes automáticos foram fundamentais para garantir a presença de todos os convidados!",
      author: "Marina Silva",
      role: "Noiva satisfeita",
      rating: 5,
    },
    {
      content:
        "Como organizador de eventos corporativos, o EventoFacil se tornou essencial para meu trabalho. A facilidade para criar listas de contribuições e gerenciar RSVPs economiza horas do meu dia.",
      author: "Rafael Mendes",
      role: "Produtor de eventos",
      rating: 5,
    },
    {
      content:
        "Meus amigos sempre ficam impressionados com o nível de organização dos meus churrascos e encontros. Tudo graças ao EventoFacil! A função de previsão do tempo já salvou várias festas.",
      author: "Juliana Costa",
      role: "Entusiasta de festas",
      rating: 4,
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
          O que nossos usuários dizem
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Histórias reais de pessoas que simplificaram a organização de seus
          eventos
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialSection;
