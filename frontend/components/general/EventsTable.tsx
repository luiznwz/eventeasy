/* Used AI to help with types  */
import { EventTypes, EventWithTotalGuests } from '@/util/types/event'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { getTypeKeyByValue } from '@/util/constants'
import { formattedDate } from '@/util/functions/formattedDate'
import { Button } from '../ui/button'
import { BarChart3, CheckSquare, Edit, Trash2 } from 'lucide-react'
import { deleteEvent } from "@/services/eventFunctions";
import { QueryObserverResult } from '@tanstack/react-query'


type EventsTableProps
 = {
    eventsToDisplay: EventWithTotalGuests[];
    setEventToEdit: React.Dispatch<React.SetStateAction<EventTypes | undefined>>;
    setIsCreateEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetchMyEvents: () => Promise<QueryObserverResult<EventTypes[], Error>>;
 }
export default function EventsTable({eventsToDisplay, setEventToEdit, setIsCreateEventModalOpen, refetchMyEvents }: EventsTableProps) {


    function handleEditEvent(id: string): void {
        const eventToEdit = eventsToDisplay?.find((event) => event.id === id) || undefined;
        setEventToEdit(eventToEdit);
        setIsCreateEventModalOpen(true);
      }
  
      async function handleDeleteEvent(id: string): Promise<void> {
        try {
          await deleteEvent(id);
          await refetchMyEvents();
        }
        catch (error) {
          console.error("Erro ao deletar evento:", error); 
        }
      }

    return (
        <table className="w-full border-collapse border border-gray-200 rounded-md overflow-x-scroll">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 text-left text-gray-700">Evento</th>
                <th className="px-4 py-2 text-left text-gray-700">Data</th>
                <th className="px-4 py-2 text-left text-gray-700">Local</th>
                <th className="px-4 py-2 text-left text-gray-700">Inscrições</th>
                <th className="px-4 py-2 text-left text-gray-700">Ações</th>
            </tr>
            </thead>
            <tbody>
            {eventsToDisplay.map((event) => (
                <tr key={event.id} className="border-t border-gray-200">
                <td className="px-4 py-2 font-semibold flex flex-col gap-1">
                    <Link href={`/eventos/${event.id}`}>{event.title} </Link>
                    <Badge
                    variant="secondary"
                    className={`top-2 text-[.65rem]
                    ${
                        getTypeKeyByValue(event.type) === "presencial"
                        ? "border-gray-300 bg-gray-100/90 black"
                        : "text-blue-800 bg-blue-100/90 border-blue-300"
                    }`}
                    >
                    {getTypeKeyByValue(event.type) === "presencial" ? "Presencial" : "Online"}
                    </Badge>
                </td>
                <td className="px-4 py-2">{formattedDate(event.date)}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{event.totalGuests}</td>
                <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/eventos/${event.id}`}>
                        <BarChart3 className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/eventos/${event.id}/inscricoes`}>
                        <CheckSquare className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditEvent(event.id)}
                        className="cursor-pointer"
                        >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="cursor-pointer"
                        >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
