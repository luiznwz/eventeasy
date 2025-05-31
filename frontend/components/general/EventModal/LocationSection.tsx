import { MapPin } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type LocationSectionProps = {
  isOnlineEvent: boolean;
  location: string;
  eventLink: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LocationSection({
  isOnlineEvent,
  location,
  eventLink,
  onChange
}: LocationSectionProps) {
  if (isOnlineEvent) {
    return (
      <div className="space-y-2 fade-in">
        <Label htmlFor="eventLink" className="text-blue-500 font-medium">
          Link do Evento <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="eventLink"
          name="eventLink"
          value={eventLink}
          onChange={onChange}
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Cole o link da reunião (Zoom, Teams, etc)"
          required={isOnlineEvent}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2 w-full">
      <Label htmlFor="location" className="text-blue-500 font-medium flex items-center">
        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
        Local 
      </Label>
      <Input
        id="location"
        name="location"
        value={location}
        onChange={onChange}
        className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Digite o local do evento"
      />
    </div>
  );
}