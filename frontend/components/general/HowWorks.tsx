"use client";

import { motion } from "framer-motion";
import { Calendar, Check, Users } from "lucide-react";

export default function HowWorks() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-6 md:px-12 lg:px-20 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Como o EventoFacil Funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Crie seu evento</h3>
            <p className="text-gray-600">
              Defina data, hora, local e número de convidados para seu evento em
              minutos.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Convide amigos</h3>
            <p className="text-gray-600">
              Convide facilmente por e-mail, WhatsApp ou compartilhe um link
              para seu evento.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Gerencie confirmações
            </h3>
            <p className="text-gray-600">
              Acompanhe respostas, envie lembretes e organize contribuições dos
              convidados.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
