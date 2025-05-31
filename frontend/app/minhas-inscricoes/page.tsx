"use client"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import EventCard from "@/components/general/EventCard"
import { upcomingEvents } from "@/mockedData"

export default function MyEventsPage() {

    const [events] = useState(upcomingEvents)

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Meus Eventos</h1>

            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Buscar eventos..." className="pl-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
                events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
                <p className="col-span-full text-center text-muted-foreground py-8">Nenhum evento encontrado.</p>
            )}
            </div>
        </div>
    )
}


