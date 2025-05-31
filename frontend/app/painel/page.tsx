"use client"
import EventModal from "@/components/general/EventModal/EventModal";
import { Button } from "@/components/ui/button";
import { EventStatus, EventTypes } from "@/util/types/event";
import { Plus, Search,  } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useGetMyEvents } from "@/services/eventFunctions";
import { getStatusKeyByValue, statusMap } from "@/util/constants";
import useAuthContext from "@/hooks/auth/useAuthContext";
import EventsTable from "@/components/general/EventsTable";
import { useGetGuestsForEvents } from "@/services/guestFunctions";
import { GuestOnEvent } from "@/util/types/guest";

export default function Painel() {

    const [search, setSearch] = useState('');
    const [eventStatus, setEventStatus] = useState<EventStatus>('ativo');
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<EventTypes | undefined>();
    const [activeEvents, setActiveEvents] = useState<EventTypes[]>([]);
    const [completedEvents, setCompletedEvents] = useState<EventTypes[]>([]);
    const [eventsToDisplay, setEventsToDisplay] = useState<EventTypes[]>([]);
    
    const { user } = useAuthContext();
    const { data: MyEvents, refetch: refetchMyEvents } = useGetMyEvents(user?.id || '');

    useEffect(() => {
      if (!MyEvents || MyEvents.length === 0) {
          return;
      }
    
      const filteredEvents = MyEvents.filter((event) => {
          const statusMatch = event.status === statusMap[eventStatus];
          const titleMatch = event.title.toLowerCase().includes(search.toLowerCase());
          return statusMatch && titleMatch;
      });

      setActiveEvents(MyEvents.filter((event) => getStatusKeyByValue(event.status) === 'ativo'));
      setCompletedEvents(MyEvents.filter((event) => getStatusKeyByValue(event.status) === 'concluido'));
  
      setEventsToDisplay(filteredEvents);
    }, [MyEvents, eventStatus, search])


    const guestQueries = useGetGuestsForEvents(MyEvents || []);

    const guestsAmountPerEvent: GuestOnEvent[] = guestQueries.map(query => {
        return query.data && typeof query.data === 'object' && 'total' in query.data
            ? query.data
            : { total: 0, message: '', guests: [] };
    });

    const eventsWithGuests = eventsToDisplay.map(event => {
      const guestData = guestsAmountPerEvent.find(guest => guest.guests.length > 0 && guest.guests[0].eventId === event.id);
      
      return {
          ...event,
          totalGuests: guestData ? guestData.total : 0
      };
  });

  const totalGuestsCount = guestsAmountPerEvent.reduce((sum, guestData) => sum + guestData.total, 0);


    useEffect(() => {
      if (!isCreateEventModalOpen) {
        refetchMyEvents();
        setEventToEdit(undefined);
      }
    }, [isCreateEventModalOpen, refetchMyEvents]);

    return (
      <ProtectedRoute>
          <main className="container mx-auto py-8 px-4 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h1 className="text-2xl sm:text-3xl font-bold">Painel do Organizador</h1>
                    <p className="text-sm sm:text-base text-gray-700">Gerencie seus eventos e acompanhe inscrições</p>
                  </div>
                  <Button
                      variant="outline"
                      onClick={() => setIsCreateEventModalOpen(true)}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-500/90 hover:text-white text-white px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base">
                        <Plus />
                        <span className="ml-1 sm:ml-2">Criar evento</span>
                  </Button>
                  {
                    isCreateEventModalOpen &&
                    <EventModal 
                      isOpen={isCreateEventModalOpen} 
                      setIsOpen={setIsCreateEventModalOpen} 
                      eventToEdit={eventToEdit}
                      refetchMyEvents={refetchMyEvents}
                      />
                  }
                </div>
                <div className="flex flex-col sm:flex-row gap-8 mb-8">
                    <div className="rounded-md border border-gray-200 px-6 py-8 w-full">
                      <h2 className="text-3xl font-bold">{activeEvents.length || 0}</h2>
                      <p className="text-gray-700">Eventos ativos</p>
                      <p className="text-gray-700">Eventos publicados e abertos 
                      para inscrições</p>
                    </div>
                    <div className="rounded-md border border-gray-200 px-6 py-8 w-full">
                      <h2 className="text-3xl font-bold">{totalGuestsCount || 0}</h2>
                      <p className="text-gray-700">Total de inscriçoes</p>
                      <p className="text-gray-700">Participantes confirmados em todos os eventos</p>
                    </div>
                    <div className="rounded-md border border-gray-200 px-6 py-8 w-full">
                      <h2 className="text-3xl font-bold">{completedEvents.length || 0}</h2>
                      <p className="text-gray-700">Eventos Realizados</p>
                      <p className="text-gray-700">Eventos concluídos com sucesso</p>
                    </div>
                </div>
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      value={search} 
                      onChange={(e) => setSearch(e.target.value)} 
                      type="text" 
                      placeholder="Buscar eventos..." 
                      className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm pl-10" 
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <div className="flex-1 flex gap-1 p-1 bg-slate-200 rounded-md">
                        <Button 
                          className={cn(
                            "w-full cursor-pointer", 
                            eventStatus === 'ativo' ? "bg-white text-black hover:bg-white" : "bg-transparent text-slate-500 hover:bg-slate-100"
                          )}                
                          onClick={() => setEventStatus('ativo')}
                          >
                            Ativos
                        </Button>
                        <Button 
                          className={cn(
                            "w-full cursor-pointer", 
                            eventStatus === 'concluido' ? "bg-white text-black hover:bg-white" : "bg-transparent text-slate-500 hover:bg-slate-100"
                          )}                 
                          onClick={() => setEventStatus('concluido')}
                          >
                            Concluídos
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                      {
                        eventsToDisplay.length === 0 && 
                        <p className="text-gray-700">Nenhum evento encontrado</p>    
                      }
                      {
                        eventsToDisplay.length !== 0 && 
                        <EventsTable 
                          eventsToDisplay={eventsWithGuests} 
                          setEventToEdit={setEventToEdit} 
                          setIsCreateEventModalOpen={setIsCreateEventModalOpen}
                          refetchMyEvents={refetchMyEvents}
                        />
                      }
                    </div>
                </div>
          </main>
      </ProtectedRoute>
    );
}
