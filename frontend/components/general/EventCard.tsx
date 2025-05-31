"use client";
import { Button } from "@/components/ui/button";
import { formattedDate } from "@/util/functions/formattedDate";
import { EventTypes } from "@/util/types/event";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { EventCardSkeleton } from "./EventCardSkeleton";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useEffect, useState } from "react";
import { defaultImgUrl } from "@/util/constants";
import { useGetEventImgUrl } from "@/hooks/useGetEventImgUrl";


interface EventCardProps {
  event: EventTypes;
  isLoading?: boolean;
}

export default function EventCard({ event, isLoading = false }: EventCardProps) {

  const { isLogged } = useAuthContext();
  const [imageUrl, setImageUrl] = useState<string>(defaultImgUrl);

  const { data: pexelsImageUrl } = useGetEventImgUrl(event?.title as string);

  useEffect(() => {
    if(!event?.title) return
    
    if(pexelsImageUrl) {
        setImageUrl(pexelsImageUrl);
    }
  }, [event?.title, pexelsImageUrl]);
  
  if (isLoading) {
    return <EventCardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className=" bg-white rounded-md border border-gray-200">
      <div className="flex-1 h-[12rem] relative">
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt="Imagem do evento"
          className="w-full h-full object-cover rounded-t-md"
        />
        <Badge
          variant="secondary"
          aria-label="Presencial ou Online"
          className={`absolute top-2 right-2 text-[.65rem]
                    ${
                      event.type.toLowerCase() === "presencial"
                        ? "border-gray-300 bg-gray-100/90 black"
                        : "text-blue-800 bg-blue-100/90 border-blue-300"
                    }`}
        >
          {event.type === "presencial" ? "Presencial" : "Online"}
        </Badge>
      </div>
      <div className="p-4 flex w-full h-fit flex-col justify-between text-black space-y-1">
        <div className="space-y-3 text-sm h-[10rem]">
          <h3 className="text-xl font-bold line-clamp-2">{event.title}</h3>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formattedDate(event.date)}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span> {/* TODO: Adicionar numero de Guests */}
              {/* {event.registered} / {event.capacity} */} participantes
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="w-full bg-blue-500 hover:bg-blue-500/80 text-white mt-3 cursor-pointer">
            <Link href={`/eventos/${event.id}`}>
              <span>Ver detalhes</span>
            </Link>
          </Button>


          {isLogged && (
            <Button className="w-full bg-blue-400 hover:bg-blue-500/80 text-white mt-3 cursor-pointer">
              <Link href={`/eventos/${event.id}`}>
                <span>Add to calendar</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
