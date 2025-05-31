import { EventType, EventTypes } from "./event";

interface Gift {
  id: string;
  name: string;
  value: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: EventType;
  capacity: number;
  isPublic: boolean;
  status: string;
  eventLink: string;
  gifts: Gift[];
}

export interface EventModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  eventToEdit?: EventTypes;
  refetchMyEvents: () => void
}
