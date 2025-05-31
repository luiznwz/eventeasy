import { EventFormData } from "@/util/types/modal";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { EventTypes } from "@/util/types/event";

export const createEvent = async (event: Omit<EventFormData, "eventLink" | "gifts" | "time">) => {
    try {
        const response = await axiosInstance.post('/events', event);
        toast.success("Evento criado com sucesso!");
        return response.data;
    } catch (error) {
        toast.error("Erro ao criar evento. Tente novamente!");
        console.error("Erro ao criar evento:", error);
        throw error;
    }
};

const getAllPublicEvents = async () => {
    try {
        const { data } = await axiosInstance.get('/events/public');
        return data as EventTypes[];
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        throw error;
    }
};
export const useGetAllPublicEvents = () => {
    const query = useQuery({
        queryKey: ['all-events'],
        queryFn: getAllPublicEvents
    })

    return query
}

const getMyEvents = async (userId: string) => {
    try {
        const { data } = await axiosInstance.get(`/events/my-events/${userId}`);
        return data as EventTypes[];
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        throw error;
    }
};
export const useGetMyEvents = (userId: string) => {
    const query = useQuery({
        queryKey: ['my-events'],
        queryFn: () => getMyEvents(userId),
        enabled: !!userId
    })

    return query
}

 const getSpecificEvent = async (eventId: string) => {
    try {
        const { data } = await axiosInstance.get(`/events/${eventId}`);
        return data;
    } catch (error) {
        console.error("Erro ao carregar evento:", error);
        throw error;
    }
};
export const useGetSpecificEvent = (eventId: string) => {
    const query = useQuery<EventTypes, Error>({
        queryKey: [`specific-event${eventId}`],
        queryFn: () => getSpecificEvent(eventId),
        enabled: !!eventId
    })

    return query
}

export const updateEvent = async (eventId: string, eventData: Omit<EventFormData, "eventLink" | "gifts" | "time">) => {
    try {
        const response = await axiosInstance.patch(`/events/${eventId}`, eventData);
        toast.success("Evento atualizado com sucesso!");
        return response.data;
    } catch (error) {
        toast.error("Erro ao atualizar evento.");
        console.error("Erro ao atualizar evento:", error);
        throw error;
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        await axiosInstance.delete(`/events/${eventId}`);
        toast.success("Evento deletado com sucesso!");
    } catch (error) {
        toast.error("Erro ao deletar evento.");
        console.error("Erro ao deletar evento:", error);
        throw error;
    }
};