"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-12 relative"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 sm:w-64 h-48 sm:h-64 bg-green-500 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-2/3 mb-8 lg:mb-0 lg:pr-12 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                Pronto para organizar seu próximo evento de forma fácil e
                rápida?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Crie, gerencie e compartilhe eventos casuais de forma simples,
                rápida e sem burocracia, com controle de presença e lista de
                contribuições.
              </p>
            </div>
            <div className="w-full lg:w-1/3 flex justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full bg-blue-500 hover:bg-blue-600 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
              >
                <Link
                  href="/painel"
                  className="flex text-white items-center justify-center gap-2"
                >
                  Comece agora
                  <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
