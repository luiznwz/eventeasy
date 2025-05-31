import useAuthContext from '@/hooks/auth/useAuthContext';
import { EventTypes } from '@/util/types/event';
import { GuestOnEvent } from '@/util/types/guest';
import React, { useEffect, useState } from 'react'

export default function EventParticipantsSection({ event, guestsOnEvent }: { event: EventTypes, guestsOnEvent: GuestOnEvent}) {

    const [isAdmin, setIsAdmin] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        if (!event || !user) return;

        setIsAdmin(event?.user?.id === user?.id);
    }, [event, user]);

    return (
        <section className="overflow-x-auto overflow-y-auto max-h-[15rem]">
            { !isAdmin && <p className='py-5 md:py-10 text-center'>Somente o organizador consegue ver os participantes</p> }
            { isAdmin && (guestsOnEvent?.guests?.length ?? 0) > 0 &&(
                <table className="w-full border-collapse border border-gray-200 rounded-md overflow-x-scroll">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-700">Nome</th>
                        <th className="px-4 py-2 text-left text-gray-700">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {guestsOnEvent?.guests?.map((guest) => (
                            <tr key={guest.id} className="border-t border-gray-200">
                            <td className="px-4 py-2 font-semibold">{guest.name}</td>
                            <td className="px-4 py-2 font-semibold">{guest.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {
                (isAdmin &&  guestsOnEvent.total === 0 && (
                    <p className='py-5 md:py-10 text-center'>Nenhum participante ainda</p>
                ))
            }
        </section>
    )
}
