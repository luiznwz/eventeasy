"use client"
import React from 'react';
import { useParams } from "next/navigation";
import EventRegistrationForm from '@/components/general/EventRegistrationForm';
import EventDetailsCard from '@/components/general/EventDetailsCard';
import { createEventSubscription } from '@/services/eventSubscription';
import useAuthContext from '@/hooks/auth/useAuthContext';
import { useGetSpecificEvent } from '@/services/eventFunctions';
import {useRouter} from 'next/navigation';

const EventSubscriptionPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const { user } = useAuthContext();
  const { data: event } = useGetSpecificEvent(id as string);
  const router = useRouter();

  if (!id) return <p>Carregando...</p>;

  if (!event) return <p className="text-center mt-5">Evento não encontrado</p>;

  const handleSubmit = async (formData: {
    name: string;
    email: string;
    phone: string;
    termsAgreed: boolean;
  }) => {
    
    const formattedSubscriptionData = {
      name: formData.name,
      email: formData.email,
      userId: user?.id as string,
      eventId: `${event?.id}`,
    }

    const response = await createEventSubscription(formattedSubscriptionData);
    if(response === 201) {
      router.push('/eventos/inscricoes')
    }

  };

  return (
    <main className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600">{event.title}</h1>
          <p className="text-muted-foreground">Confirme sua presença no evento</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EventRegistrationForm
              onSubmit={handleSubmit}
            />
          </div>

          <div>
            <EventDetailsCard event={event} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventSubscriptionPage;