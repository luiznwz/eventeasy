import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type EventDetailsSectionProps = {
  date: Date;
  time: string;
  capacity: number;
  eventType: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCapacityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (name: string, value: string) => void;
};

export function EventDetailsSection({
  date,
  time,
  capacity,
  eventType,
  onDateChange,
  onTimeChange,
  onCapacityChange,
  onTypeChange
}: EventDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="date" className="text-blue-500 font-medium flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-blue-500" />
          Data <span className="text-red-500 ml-1">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left border-blue-200 hover:bg-blue-50",
                !date && "text-gray-500"
              )}
            >
              {date ? (
                format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              className="p-3 pointer-events-auto"
              required
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time" className="text-blue-500 font-medium flex items-center">
          <Clock className="h-4 w-4 mr-1 text-blue-500" />
          Horário <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="time"
          name="time"
          type="time"
          value={time}
          onChange={onTimeChange}
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventType" className="text-blue-500 font-medium">
          Tipo <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={eventType}
          onValueChange={(value) => onTypeChange('type', value)}
        >
          <SelectTrigger className="border-blue-200 cursor-pointer focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="presencial">Presencial</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="capacity" className="text-blue-500 font-medium">
          Capacidade Máxima <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          value={capacity}
          onChange={onCapacityChange}
          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Digite a capacidade"
          required
        />
      </div>
    </div>
  );
}