// Used IA
export const combineDateTime = (dateString: string, timeString: string): Date => {
    const date = new Date(dateString); 
    const [hours, minutes] = timeString.split(":").map(Number); 

    date.setHours(hours, minutes, 0, 0); 

    return date; 
}