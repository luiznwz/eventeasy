"use client";
import CallToAction from "@/components/general/CallToAction";
import EventCard from "@/components/general/EventCard";
import { EventCardSkeleton } from "@/components/general/EventCardSkeleton";
import Hero from "@/components/general/Hero";
import { Suspense, useEffect, useState } from "react";
import TextButton from "@/components/general/TextButton";
import { EventTypes } from "@/util/types/event";
import { useGetAllPublicEvents } from "@/services/eventFunctions";


export default function Home() {

    const [eventPublic, setPublicEvents] = useState<EventTypes[]>([]);

    const { data: events } = useGetAllPublicEvents();
    
    useEffect(() => {
        setPublicEvents(events || []);
    }, [events]);

    return (
      <div className="min-h-screen flex flex-col">
        <Hero />

        <div className="container py-12 mx-auto max-w-6xl">
          <TextButton />
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventPublic?.slice(0, 3).map((event, index) => (
                <EventCard key={event.id} event={eventPublic[index]} />
              ))}
            </div>
          </Suspense>
        </div>

        <CallToAction />
      </div>
    );
}

