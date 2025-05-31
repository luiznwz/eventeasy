import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { formattedDate } from "@/util/functions/formattedDate";
import { useGetEventImgUrl } from '@/hooks/useGetEventImgUrl';
import { defaultImgUrl } from '@/util/constants';
import { formattedTime } from '@/util/functions/formatTime';

interface EventDetailsCardProps {
  event: {
    title: string;
    imageUrl: string;
    date: string;
    location: string;
    description: string;
  };
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {

  const { data: pexelsImageUrl } = useGetEventImgUrl(event?.title as string);
  const [imageUrl, setImageUrl] = useState<string>(defaultImgUrl);


  useEffect(() => {
      if(!event?.title) return
      
      if(pexelsImageUrl) {
          setImageUrl(pexelsImageUrl);
      }
  }, [event?.title, pexelsImageUrl]);

    return (
      <Card className="h-full border-blue-200 border-1">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-600">
            Detalhes do Evento
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
            <Image
              src={imageUrl}
              width={400}
              height={400}
              alt={event.title}
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-blue-800">{formattedDate(event.date)}</p>
                <p className="text-sm text-muted-foreground">Data do evento</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-blue-800">{formattedTime(event.date)}</p>
                <p className="text-sm text-muted-foreground">Horário de início</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium text-blue-800">{event.location}</p>
                <p className="text-sm text-muted-foreground">Endereço</p>
              </div>
            </div>

            {/* {event.hasContribution.length > 0 && (
              <div className="flex items-center space-x-3">
                <Gift className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-800">Contribuições</p>
                  <p className="text-sm text-muted-foreground">Opções disponíveis no formulário</p>
                </div>
              </div>
            )} */}
          </div>

          <Separator className="my-4 bg-blue-200" />

          <p className="text-sm text-muted-foreground">
            {event.description}
          </p>
        </CardContent>
      </Card>
    );
};

export default EventDetailsCard;