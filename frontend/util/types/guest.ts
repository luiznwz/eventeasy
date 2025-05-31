export type GuestOnEvent = {
    total: number,
    message: string,
    guests: Guest[]
}

export type Guest = {
    id: string,
    name: string,
    email: string,
    isAttending: boolean,
    eventId: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}