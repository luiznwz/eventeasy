//Used AI to create initial validation functions 

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { EventFormData } from '@/util/types/modal';
import { createEvent, updateEvent } from '@/services/eventFunctions';
import { combineDateTime } from '@/util/functions/combineDateTime';
import { EventStatus, EventType, EventTypes } from '@/util/types/event';
import { getStatusKeyByValue, getTypeKeyByValue, transformedEventStatus, transformedEventType } from '@/util/constants';
import { EventFieldSection } from './EventFieldSection';
import { GiftSection } from './GiftSection';
import { EventDetailsSection } from './EventDetailsSection';
import { LocationSection } from './LocationSection';
import { Globe, Info, Lock } from 'lucide-react';

const initialFormData: EventFormData = {
  title: '',
  description: '',
  date: new Date(),
  time: '',
  location: '',
  type: 'presencial',
  capacity: 0,
  isPublic: true,
  eventLink: '',
  gifts: [],
  status: ''
};

interface EventFormProps {
    onClose: () => void;
    eventToEdit?: EventTypes
    refetchMyEvents: () => void
}
  
  export function EventForm({ onClose, eventToEdit, refetchMyEvents }: EventFormProps) {
    const [isOnlineEvent, setIsOnlineEvent] = useState(false);
    const [newGift, setNewGift] = useState<{ name: string, value: string }>({ name: '', value: '' });
    const [formData, setFormData] = useState<EventFormData>(
      eventToEdit
        ? {
            title: eventToEdit.title || '',
            description: eventToEdit.description || '',
            date: new Date(eventToEdit.date) || new Date(),
            time: (new Date(eventToEdit.date)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '',
            location: eventToEdit.location || '',
            type: eventToEdit.type || 'presencial',
            capacity: eventToEdit.capacity || 0,
            isPublic: eventToEdit.isPublic || true,
            eventLink: '',
            gifts: [],
            status: eventToEdit.status || ''
          }
        : initialFormData
    );
    
    useEffect(() => {
      if (eventToEdit) {
        const { title, description, date, location, type, capacity, isPublic, status } = eventToEdit;
        const formatedDate = new Date(date); 
        console.log('(isPublic)', isPublic)
        console.log('(type)', getTypeKeyByValue(type))
  
        setFormData({
          title,
          description,
          date: formatedDate,
          time: formatedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).slice(0, 5),
          location,
          type: getTypeKeyByValue(type) as EventType,
          capacity,
          isPublic,
          eventLink: getTypeKeyByValue(type) === 'online' ? eventToEdit.location : '',
          gifts: [], 
          status: getStatusKeyByValue(status) as EventStatus, 
        });
      }
    }, [eventToEdit]);

  useEffect(() => {
    if (formData.type === 'online') {
      setIsOnlineEvent(true);
    } 
    else {
      setIsOnlineEvent(false);
      if (formData.eventLink) {
        setFormData(prev => ({ ...prev, eventLink: '' }));
      }
    }
  }, [formData.eventLink, formData.type]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setFormData(prev => ({ ...prev, date }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublic: checked }));
  };

  const handleAddGift = () => {
    if (!newGift.name.trim() || !newGift.value.trim()) {
      toast.error('Preencha o nome e valor do presente');
      return;
    }

    const gift = {
      id: Date.now().toString(),
      name: newGift.name,
      value: newGift.value,
    };

    setFormData(prev => ({
      ...prev,
      gifts: [...prev.gifts, gift],
    }));

    setNewGift({ name: '', value: '' });
  };

  const handleRemoveGift = (id: string) => {
    setFormData(prev => ({
      ...prev,
      gifts: prev.gifts.filter(gift => gift.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validations = [
      { condition: !formData.title.trim(), message: 'Nome do evento é obrigatório' },
      { condition: !formData.date, message: 'Data do evento é obrigatória' },
      { condition: !formData.time.trim(), message: 'Horário do evento é obrigatório' },
      { condition: !formData.capacity, message: 'Capacidade do evento é obrigatória' },
      { condition: formData.type === 'online' && !formData.eventLink.trim(), message: 'Link do evento online é obrigatório' }
    ];

    const error = validations.find(({ condition }) => condition);
    if (error) {
      console.log(error.message);
      toast.error(error.message);
      return;
    }
    
    if(formData) {
      const formattedDate = {
        title: formData.title,
        description: formData.description,
        date: combineDateTime(formData.date.toString(), formData.time),
        location: formData.location || formData.eventLink,
        type: transformedEventType[formData.type] as EventType,
        status: transformedEventStatus['Ativo'],
        capacity: Number(formData.capacity),
        isPublic: formData.isPublic,
        imageUrl: 'url'
      }

      if(eventToEdit) {
          try {
            await updateEvent(eventToEdit.id, formattedDate);   
          } 
          catch (error) {
            console.log("Erro ao enviar formulário:", error);
          }
          finally {
            setFormData(initialFormData);
            refetchMyEvents();
            setTimeout(() => {
              onClose();
            }, 1000);
          }
          return 
      }  

      try {
        await createEvent(formattedDate);
        toast.success("Evento criado com sucesso!");         
      } 
      catch (error) {
        toast.error("Erro ao criar evento.");         
        console.log("Erro ao enviar formulário:", error);
      }
      finally {
        setFormData(initialFormData);
        refetchMyEvents();
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <EventFieldSection
            label="Nome do Evento"
            required
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Digite o nome do evento"
        />

        <EventFieldSection
            label="Descrição do Evento"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            placeholder="Descreva os detalhes do evento"
        />

        <EventDetailsSection
            date={formData.date}
            time={formData.time}
            capacity={formData.capacity}
            eventType={formData.type}
            onDateChange={handleDateChange}
            onTimeChange={handleInputChange}
            onCapacityChange={handleInputChange}
            onTypeChange={handleSelectChange}
        />

        <LocationSection
            isOnlineEvent={isOnlineEvent}
            location={formData.location}
            eventLink={formData.eventLink}
            onChange={handleInputChange}
        />

        <div className="flex items-center space-x-2">
            <Switch
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={handleSwitchChange}
            className="data-[state=checked]:bg-blue-500 cursor-pointer"
            />
            <div className="flex items-center">
            <Label htmlFor="isPublic" className="text-blue-500 font-medium mr-1 cursor-pointer">
                {formData.isPublic ?
                <span className="flex items-center"><Globe className="h-4 w-4 mr-1" /> Evento Público</span> :
                <span className="flex items-center"><Lock className="h-4 w-4 mr-1" /> Evento Privado</span>
                }
            </Label>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-blue-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="bg-blue-600 text-white">
                    <p>Eventos públicos aparecem na busca.<br />Eventos privados só são acessíveis via link.</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </div>
        </div>

        <GiftSection
            gifts={formData.gifts}
            newGift={newGift}
            setNewGift={setNewGift}
            onAddGift={handleAddGift}
            onRemoveGift={handleRemoveGift}
        />

        <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" className="text-blue-800 cursor-pointer border-blue-300 hover:bg-blue-50" onClick={onClose}>
            Cancelar
            </Button>
            <Button
            type="submit"
            className="bg-green-600 cursor-pointer hover:bg-green-600/90 transition-colors"
            >
            {eventToEdit ? 'Salvar Alterações' : 'Criar Evento'}
            </Button>
        </div>
    </form>
  );
}