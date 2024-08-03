import queryAPI from "../queryAPI.ts";
import Autor from "../../interfaces/autor.ts";
import {useQuery} from "@tanstack/react-query";

const AutoresQuery = () =>{
    const {recuperar} = queryAPI<Autor>("/autores");
    return useQuery(
        {
            queryKey: ["autores"],
            queryFn: () =>recuperar(),
            staleTime: 10_000,
        }
    );
}

export default  AutoresQuery;