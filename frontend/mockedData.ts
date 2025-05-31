import { EventStatus, EventType } from "@/util/types/event";

export const upcomingEvents = [
  {
    id: "sfgsvbedfsd",
    title: "Maratona de Programação",
    date: "2025-04-15T09:00:00",
    time: "09:00",
    location: "Convention Center, San Francisco",
    type: "presencial" as EventType,
    capacity: 500,
    registered: 342,
    isPublic: true,
    status: "ativo" as EventStatus,
    description: "A maratona de programação é uma competição de programação feita pela comunidade de desenvolvedores de software.",
    organizer: "Comunidade de Programação",
    hasContribution: [],
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    user: {
      id: "sfdf",
      name: "Laura Carvalho",
      email: "laura@email.com"
    }
  },
  {
    id: "sdhrthfsdf",
    title: "Churrasco de Aniversário do Léo",
    date: "2025-05-10T14:00:00",
    time: "14:00",
    location: "Rua Augusta, Centro, Rio de Janeiro",
    type: "presencial" as EventType,
    capacity: 50,
    registered: 32,
    isPublic: true,
    status: "ativo" as EventStatus,
    description: "Um churrasco de aniversário para celebrar o aniversário de Léo.",
    organizer: "Léo Alves",
    hasContribution: [
      {
        id: 1,
        name: "Contribuiçao para carne",
        value: 100,
      },
      {
        id: 2,
        name: "Contribuição para bebidas",
        value: 50,
      },
    ],
    imageUrl: "https://images.unsplash.com/photo-1504564321107-4aa3efddb5bd?q=80&w=3988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: {
      id: "sfdf",
      name: "Laura Carvalho",
      email: "laura@email.com"
    }
  },
  {
    id: "sggeergehgfzcb",
    title: "Palestra sobre Tecnologia em Nuvem",
    date: "2025-04-05T18:00:00",
    time: "18:00",
    location: "Online (Zoom)",
    type: "online" as EventType,
    capacity: 1000,
    registered: 456,
    isPublic: true,
    status: "concluido" as EventStatus,
    description: "Palestra sobre tecnologia em nuvem.",
    organizer: "Comunidade de Programação",
    hasContribution: [],
    imageUrl: "https://plus.unsplash.com/premium_photo-1677093905912-a653c6301260?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8",
    user: {
      id: "sfdf",
      name: "Laura Carvalho",
      email: "laura@email.com"
    }
  }
]

export const mockedParticipants = [
  {
    id: 1,
    name: "João Afonso",
    email: "1mOy6@example.com",
    phone: "(11) 99999-9999",
  },
  {
    id: 2,
    name: "Maria Meire",
    email: "4i2yZ@example.com",
    phone: "(11) 99999-9999",
  },
  {
    id: 3,
    name: "Pedro Lucas",
    email: "WlM5X@example.com",
    phone: "(11) 99999-9999",
  },
  {
    id: 4,
    name: "Ana Torres",
    email: "4i2yZ@example.com",
    phone: "(11) 99999-9999",
  },
  {
    id: 5,
    name: "Lucas Silva",
    email: "4i2yZ@example.com",
    phone: "(11) 99999-9999",
  },
  {
    id: 6,
    name: "Fernanda Tibet",
    email: "4i2yZ@example.com",
    phone: "(11) 99999-9999",
  }
]