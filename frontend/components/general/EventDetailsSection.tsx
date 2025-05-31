import { EventTypes } from '@/util/types/event'
import React from 'react'

export default function EventDetailsSection({ event }: { event: EventTypes }) {

  return (
    <section className="space-y-4 py-4">
        <div>
            <h3 className="text-xl font-semibold mb-2">Sobre o Evento</h3>
            <p className="text-muted-foreground">{event?.description}</p>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-2">Organizador</h3>
            <p className="text-muted-foreground">{event?.user?.name}</p>
        </div>
    </section>
  )
}
