"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ContactForm() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
            Contato
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em contato com nossa equipe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos sempre abertos para ouvir suas dúvidas, sugestões ou
            feedback sobre nossa plataforma
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50/90 p-6 rounded-xl shadow-subtle">
              <h3 className="text-xl font-semibold mb-4">Suporte</h3>
              <p className="text-muted-foreground mb-4">
                Precisa de ajuda com algo? Nossa equipe de suporte está pronta
                para ajudar.
              </p>
              <a
                href="mailto:suporte@easyevent.com"
                className="text-blue-500 hover:text-blue-500/80 font-medium"
              >
                suporte@eventofacil.com
              </a>
            </div>

            <div className="bg-gray-50/90 p-6 rounded-xl shadow-subtle">
              <h3 className="text-xl font-semibold mb-4">Imprensa</h3>
              <p className="text-muted-foreground mb-4">
                Para solicitações de imprensa e mídia, entre em contato através
                do email:
              </p>
              <a
                href="mailto:imprensa@easyevent.com"
                className="text-blue-500 hover:text-blue-500/80 font-medium"
              >
                imprensa@eventofacil.com
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-card">
            <h3 className="text-xl font-semibold mb-6">
              Envie-nos uma mensagem
            </h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Assunto da mensagem"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="px-6 py-3 bg-blue-500 cursor-pointer text-white font-medium rounded-lg shadow-button hover:shadow-md transition-all hover:bg-blue-500/90"
              >
                Enviar mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
