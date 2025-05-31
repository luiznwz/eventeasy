"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Users, Clock, Share2 } from "lucide-react"
import Image from "next/image"
import { formattedDate } from "@/util/functions/formattedDate"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import EventDetailsSection from "@/components/general/EventDetailsSection"
import EventParticipantsSection from "@/components/general/EventParticipantsSection"
import { useGetSpecificEvent } from "@/services/eventFunctions"
import { EventTypes } from "@/util/types/event"
import { defaultImgUrl } from "@/util/constants"
import { useGetEventImgUrl } from "@/hooks/useGetEventImgUrl"
import ShareModal from "@/components/general/ShareModal"
import { useGetGuestsByEvent } from "@/services/guestFunctions"

export default function EventPage() {

    const [eventInfo, setEventInfo] = useState<'detalhes' | 'participantes' | 'contribuicoes'>('detalhes');
    const [SpecificEvent, setSpecificEvent] = useState<EventTypes[]>([]);
    const [imageUrl, setImageUrl] = useState<string>(defaultImgUrl);
    const [showShareModal, setShowShareModal] = useState(false);
    const params = useParams();
    const { id } = params;

    const { data: event } = useGetSpecificEvent(id as string);
    const { data: pexelsImageUrl } = useGetEventImgUrl(event?.title as string);
    const { data: guestsOnEvent } = useGetGuestsByEvent(event?.id || '');

    useEffect(() => {
        if(!event) return
        setSpecificEvent([event]);
    }, [event]);


    useEffect(() => {
        if(!event?.title) return
        
        if(pexelsImageUrl) {
            setImageUrl(pexelsImageUrl);
        }
    }, [event?.title, pexelsImageUrl]);

    
    console.log('id', id);
    if (!id) return <p>Carregando...</p>;

    if (!SpecificEvent) return <p className="text-center mt-5">Evento não encontrado</p>;

    return (
        <main className="container max-w-7xl mx-auto py-8 px-4">
            <div className="grid grid-cols-1 gap-8">
                <div className="lg:col-span-2 space-y-8">
                <div className="relative rounded-xl overflow-hidden">
                    <Image 
                        src={imageUrl} 
                        alt={SpecificEvent[0]?.title || "Imagem do evento"} className="w-full h-[300px] object-cover" 
                        width={400} 
                        height={400}
                        />
                    <div className="absolute top-4 right-4 flex gap-2">
                    <div className={`px-2 py-1 rounded ${SpecificEvent[0]?.type === "presencial" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                        {SpecificEvent[0]?.type === "presencial" ? "Presencial" : "Online"}
                    </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{SpecificEvent[0]?.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                            <span>{formattedDate(SpecificEvent[0]?.date || new Date().toLocaleString())}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-primary" />
                            <span>{(SpecificEvent[0]?.date)?.split("T")[1].slice(0, 5)}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-primary" />
                            <span>{SpecificEvent[0]?.location}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-primary" />
                            <span>
                            {guestsOnEvent !== null ? guestsOnEvent?.total : 0} / {SpecificEvent[0]?.capacity} participantes
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8">
                        <Button asChild className="bg-blue-500 hover:bg-blue-500/90 cursor-pointer">
                            <Link href={`/eventos/${id}/inscricao`}>Inscrever-se</Link>
                        </Button>
                        <Button variant="outline" className="cursor-pointer" onClick={() => setShowShareModal(true)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartilhar
                        </Button>
                    </div>

                    {
                        showShareModal && (
                            <ShareModal setShowShareModal={setShowShareModal} eventId={id as string} />
                        )
                    }

                <div>
                <div className="flex flex-1 bg-slate-200 rounded-md p-1 mb-4">
                    <Button
                        className={cn(
                        "w-full cursor-pointer",
                        eventInfo === 'detalhes' ? "bg-white text-black hover:bg-white" : "bg-transparent text-slate-500 hover:bg-slate-100"
                        )}
                        onClick={() => setEventInfo('detalhes')}
                        >
                        Detalhes
                    </Button>
                    <Button
                        className={cn(
                        "w-full cursor-pointer",
                        eventInfo === 'participantes' ? "bg-white text-black hover:bg-white" : "bg-transparent text-slate-500 hover:bg-slate-100"
                        )}
                        onClick={() => setEventInfo('participantes')}
                        >
                        Participantes
                    </Button>
                </div>
                {event && eventInfo === 'detalhes' && <EventDetailsSection event={event} />}
                {event && eventInfo === 'participantes' && guestsOnEvent && (
                  <EventParticipantsSection event={event} guestsOnEvent={guestsOnEvent} />
                )}
                <div className="">

                </div>
            </div>

                </div>
                </div>
            </div>
        </main>
    )
}