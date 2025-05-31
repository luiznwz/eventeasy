export const formattedTime = (date: string) => {
    return date.split("T")[1].split(":").slice(0, 2).join(":")
}