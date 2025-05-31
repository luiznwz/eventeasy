// Used AI to help with some handleinput logic and to make the code more readable splitting UI into components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EventModalProps } from '@/util/types/modal';
import { EventForm } from './EventForm';

export default function EventModal({ isOpen, setIsOpen, eventToEdit, refetchMyEvents }: EventModalProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-0 max-h-[90vh] overflow-hidden bg-white rounded-xl border border-blue-100">
        <DialogHeader className="px-6 pt-6 pb-2 border-b border-blue-100 sticky top-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-center cursor-pointer text-blue-500">
            Criação do Evento
          </DialogTitle>
          <DialogDescription className="sr-only">
            Preencha os campos para criar um novo evento
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)] px-6 py-4">
          <EventForm onClose={handleClose} eventToEdit={eventToEdit} refetchMyEvents={refetchMyEvents} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}