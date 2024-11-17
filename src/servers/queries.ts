import { useQuery } from "@tanstack/react-query"
import { getServerById, getServers } from "./api"

export function useServers() {
    return useQuery({
        queryKey: ['servers'],
        queryFn: getServers,
        refetchOnWindowFocus: false
    })
}

export function useServerById(id: string) {
    return useQuery({
        queryKey: ['server', {id: id}],
        queryFn: ()=>getServerById(id),
        refetchOnWindowFocus: false
    })
}
