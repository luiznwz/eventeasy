import axiosInstance from "./axiosInstance";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GuestOnEvent } from "@/util/types/guest";

const getGuests = async (eventId: string) => {
    try {
        const { data } = await axiosInstance.get(`/guests/by-event/${eventId}`);
        return data as GuestOnEvent; 
    } catch (error) {
        console.error("Erro ao carregar eventos:", error);
        return null; 
    }
};

export const useGetGuestsByEvent = (eventId: string) => {
    return useQuery({
        queryKey: ['guests-on-event', eventId],
        queryFn: () => getGuests(eventId),
        enabled: !!eventId,
    });
};

export const useGetGuestsForEvents = (events: { id: string }[]) => {
    return useQueries({
        queries: events.map((event) => ({
            queryKey: ['guests-on-event', event.id],
            queryFn: () => getGuests(event.id),
            enabled: !!event.id,
        })),
    });
};