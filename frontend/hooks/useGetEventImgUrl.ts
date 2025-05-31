import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getPexelsEventImage = async (eventTitle: string) => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${eventTitle}&orientation=landscape&size=medium&per_page=1`,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
          },
        }
      );
      const imageUrl = response.data.photos[0].src.original;
      return imageUrl;
    } catch (error) {
      console.error("Erro ao buscar imagem do Pexels:", error);
    }
}

export const useGetEventImgUrl = (eventTitle: string) => {
    const query = useQuery({
        queryKey: ['event-img-url', eventTitle],
        queryFn: () => getPexelsEventImage(eventTitle),
        enabled: !!eventTitle
    })

    return query;
}