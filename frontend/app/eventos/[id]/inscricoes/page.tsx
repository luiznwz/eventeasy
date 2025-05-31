// Used AI
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Download, CheckCircle2, XCircle } from "lucide-react"
import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { toast } from "sonner"
import { useGetGuestsByEvent } from "@/services/guestFunctions"
import useAuthContext from "@/hooks/auth/useAuthContext"
import { useGetSpecificEvent } from "@/services/eventFunctions"
import { formattedDate } from "@/util/functions/formattedDate"
import { useParams } from "next/navigation"
import { Guest, GuestOnEvent } from "@/util/types/guest"

export type GuestsPresent = Guest & {
    present: boolean;
};

export default function AttendancePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
    const params = useParams();

    const { data } = useGetGuestsByEvent(params.id as string);
    const guestsOnEvent: GuestOnEvent | null = data || null;
    const { data: event } = useGetSpecificEvent(params.id as string);

    const [isAdmin, setIsAdmin] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!event || !user) return;
        setIsAdmin(event?.user?.id === user?.id);
    }, [event, user]);

    const [participants, setParticipants] = useState<GuestsPresent[]>([]);

    useEffect(() => {
        if (guestsOnEvent?.guests) {
            const transformedGuests = guestsOnEvent.guests.map(guest => ({
                ...guest,
                present: guest.isAttending 
            }));
            setParticipants(transformedGuests);
        }
    }, [guestsOnEvent]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const filteredParticipants = participants.filter(
        (participant) =>
        participant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const toggleParticipantSelection = (participantId: string) => {
        setSelectedParticipants((prev) =>
            prev.includes(participantId) ? prev.filter((id) => id !== participantId) : [...prev, participantId]
        );
    };

    const toggleAllParticipants = () => {
        if (selectedParticipants.length === filteredParticipants.length) {
            setSelectedParticipants([]);
        } else {
            setSelectedParticipants(filteredParticipants.map((p) => p.id));
        }
    };

    const markAsPresent = async () => {
        toast.success(`Marcados como presentes: ${selectedParticipants.length} participantes`);
        setSelectedParticipants([]);
    }

    const markAsAbsent = async () => {
        toast.success(`Marcados como ausentes: ${selectedParticipants.length} participantes`);
        setSelectedParticipants([]);
    }


    if (!params.id) return <main className="h-screen"><p className="text-center mt-5">Carregando...</p></main>;
    if (!event) return <main className="h-screen"><p className="text-center mt-5">Evento nao encontrado.</p></main>;
    if (!isAdmin) return <main className="h-screen"><p className="text-center mt-5">Somente o criador do evento pode acessar essa pagina.</p></main>;

    return (
        <ProtectedRoute>
            <main className="container mx-auto py-8 px-4">{/*   */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{event?.title}</h1>
                    </div>
                    <p className="text-muted-foreground">Controle de presença • {formattedDate(event?.date)}</p>
                    </div>
                    <Button variant="outline">
                        <Download className="mr-2 h-5 w-5" />
                        Exportar Lista
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
                    <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6 pb-2">
                        <h3 className="text-2xl font-semibold">{guestsOnEvent?.total || 0}</h3>
                        <p className="text-sm text-muted-foreground">Total de Inscritos</p>
                    </div>
                    </div>

                    <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6 pb-2">
                        <h3 className="text-2xl font-semibold">{participants.filter((p) => p.present).length}</h3>
                        <p className="text-sm text-muted-foreground">Presentes</p>
                    </div>
                    </div>

                    <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6 pb-2">
                        <h3 className="text-2xl font-semibold">{participants.filter((p) => !p.present).length}</h3>
                        <p className="text-sm text-muted-foreground">Ausentes</p>
                    </div>
                    </div>

                    <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6 pb-2">
                        <h3 className="text-2xl font-semibold">
                        {participants.length > 0 
                            ? Math.round((participants.filter((p) => p.present).length / participants.length) * 100)
                            : 0}%
                        </h3>
                        <p className="text-sm text-muted-foreground">Taxa de Presença</p>
                    </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-600">Lista de Participantes</h3>
                    <p className="text-sm text-muted-foreground">Gerencie a presença dos participantes no evento</p>
                    </div>
                    <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                            type="text"
                            placeholder="Buscar participantes..."
                            className="flex h-10 w-full sm:w-[300px] rounded-md border border-input bg-background pl-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button
                            variant="outline"
                            size="sm"
                            onClick={markAsPresent}
                            disabled={selectedParticipants.length === 0}
                            >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Marcar Presentes
                            </Button>
                            <Button variant="outline" size="sm" onClick={markAsAbsent} disabled={selectedParticipants.length === 0}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Marcar Ausentes
                            </Button>
                        </div>
                        </div>

                        <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                <th className="h-12 w-12 px-4">
                                    <div className="flex items-center justify-center h-4 w-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        checked={
                                        filteredParticipants.length > 0 &&
                                        selectedParticipants.length === filteredParticipants.length
                                        }
                                        onChange={toggleAllParticipants}
                                        aria-label="Select all"
                                    />
                                    </div>
                                </th>
                                <th className="h-12 px-4 text-left font-medium">Participante</th>
                                <th className="h-12 px-4 text-left font-medium">Email</th>
                                <th className="h-12 px-4 text-left font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredParticipants.length > 0 ? (
                                filteredParticipants.map((participant) => (
                                    <tr key={participant.id} className="border-b">
                                    <td className="p-4">
                                        <div className="flex items-center justify-center h-4 w-4">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            checked={selectedParticipants.includes(participant.id)}
                                            onChange={() => toggleParticipantSelection(participant.id)}
                                            aria-label={`Select ${participant.name}`}
                                        />
                                        </div>
                                    </td>
                                    <td className="p-4 font-medium">{participant.name}</td>
                                    <td className="p-4 text-muted-foreground">{participant.email}</td>
                                    <td className="p-4">
                                        <Badge variant="secondary" className={`top-2 text-[.65rem]
                                        ${
                                            participant.present 
                                            ? "text-blue-800 bg-blue-100/90 border-blue-300"
                                            : "border-gray-300 bg-gray-100/90 black"
                                        }`} >
                                        {participant.present ? "Presente" : "Ausente"}
                                        </Badge>
                                    </td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan={4} className="h-24 text-center">
                                    Nenhum participante encontrado
                                    </td>
                                </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    )
}