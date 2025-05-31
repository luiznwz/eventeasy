import { toast } from "sonner";
import axiosInstance from "./axiosInstance";

type GuestData = {
    name: string;
    email: string;
    eventId: string;
    userId: string;
}

export const createEventSubscription = async (guestData: GuestData) => {
    try {
        const response = await axiosInstance.post('/guests', guestData);
        toast.success('Inscrição confirmada!', {
            description: `Você está inscrito no evento. Um e-mail de confirmação foi enviado.`,
            action: {
              label: 'Fechar',
              onClick: () => {},
            },
        });
        return response.status;
    }
    catch (error) {
        console.error("Erro ao criar inscrição:", error);
        toast.error('Erro ao criar inscrição.');
        throw error;
    }
};