"use client"
import { Filter, Search, } from "lucide-react";
import EventCard from "@/components/general/EventCard";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, useState } from "react";
import { EventCardSkeleton } from "@/components/general/EventCardSkeleton";
import { EventTypes } from "@/util/types/event";
import { useGetAllPublicEvents } from "@/services/eventFunctions";

export default function PublicEvents() {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<EventTypes[]>([]);

    const { data: allEvents } = useGetAllPublicEvents();

    useEffect(() => {
      if (!allEvents) return;
      const filtered = allEvents?.filter((event: EventTypes) => {
        const titleMatch = event.title.toLowerCase().includes(search.toLowerCase());
        const typeMatch = event.type === filter;
        return titleMatch || typeMatch;
      });
      setFilteredEvents(filtered || []);
    }, [allEvents, filter, search]);
    

    return (
      <main className="max-w-7xl mx-auto py-8 px-4 space-y-5">
          <div className="">
            <h1 className="text-3xl font-bold">Eventos Públicos</h1>
            <p className="text-gray-700">Descubra eventos interessantes para participar</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Buscar eventos..."
                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm pl-10"
              />
            </div>
            <Button
                variant="outline"
                onClick={() => setFilter('presencial')}
                className="cursor-pointer">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
            </Button>
          </div>

          <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </Suspense>
      </main>
    )
}
