"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Globe, Mail } from "lucide-react";
import Image from "next/image";

const PageHeader = () => (
  <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Nossa Equipe
        </motion.span>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Conheça quem está por trás do{" "}
          <span className="text-blue-500"> EventoFacil</span>
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Uma equipe apaixonada por criar experiências incríveis e simplificar a
          forma como as pessoas organizam eventos.
        </motion.p>
      </div>
    </div>
  </section>
);

const Team = () => {
  const teamMembers = [
    {
      name: "Luiz Renan",
      role: "CEO & Co-founder",
      bio: "Desenvolvedor front-end apaixonada por eventos e tecnologia, Luiz lidera a visão e estratégia do EventoFacil desde sua fundação.",
      photo: null,
      email: "luizrenan179@gmail.com",
      url: "valdisonbrito.com",
      github: "https://github.com/luiznwz.png",
    },
    {
      name: "Patrick Simoes",
      role: "CEO & Co-founder",
      bio: "Desenvolvedor full-stack com mais de 2 anos de experiência, Patrick lidera toda a arquitetura tecnológica da plataforma.",
      photo: null,
      email: "patrick.simoes@gmail.com",
      url: "valdisonbrito.com",
      github: "https://github.com/PatrickSimoes.png",
    },
    {
      name: "Valdison Brito",
      role: "CEO & Co-founder",
      bio: "Especialista em UX/UI com foco em criar experiências digitais intuitivas e elegantes para os usuários.",
      photo: null,
      email: "valdison.brito@gmail.com",
      url: "valdisonbrito.com",
      github: "https://github.com/vandilsonbrito.png",
    },
  ];
  return (
    <motion.section
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-card overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative bg-gray-100 h-64 flex items-center justify-center">
                <Image
                  className="object-cover transition-transform duration-300"
                  alt="github profile picture"
                  src={member.github}
                  fill
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a
                    href={member.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Values = () => (
  <motion.section
      className="py-16 md:py-24"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-16">
        <Badge className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-4">
          Nossos Valores
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          O que guia nossas decisões
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Os princípios fundamentais que orientam nosso trabalho e definem nossa
          cultura
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-2 rounded-xl shadow-card">
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary text-xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Foco no usuário</h3>
          <p className="text-muted-foreground">
            Todas as nossas decisões são guiadas pelas necessidades reais dos
            nossos usuários. Acreditamos que, ao resolver problemas reais de
            forma simples e eficiente, criamos valor genuíno para as pessoas.
          </p>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-card">
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary text-xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Simplicidade</h3>
          <p className="text-muted-foreground">
            Acreditamos que a simplicidade é a forma mais avançada de
            sofisticação. Buscamos constantemente maneiras de tornar a
            experiência do usuário mais simples, intuitiva e livre de obstáculos
            desnecessários.
          </p>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-card">
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary text-xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Transparência</h3>
          <p className="text-muted-foreground">
            Mantemos uma comunicação aberta e honesta com nossos usuários e
            entre nossa equipe. Acreditamos que a confiança é construída através
            da transparência e da integridade em todas as nossas ações.
          </p>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-card">
          <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary text-xl font-bold">4</span>
          </div>
          <h3 className="text-xl font-semibold mb-3">Inovação contínua</h3>
          <p className="text-muted-foreground">
            Nunca paramos de evoluir. Estamos constantemente buscando maneiras
            de melhorar nossa plataforma, incorporando novas tecnologias e
            refinando nossos processos para oferecer a melhor experiência
            possível.
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

const Equipe = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <Team />
      <Values />
    </div>
  );
};

export default Equipe;
