import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteServer, updateServer, createServer } from "./api";

export function useCreateServer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: FormData) => createServer(data),
       
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["servers"] })
            }

        },
    })
}

export function useUpdateServer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({data, id}:{data: FormData, id: string}) => updateServer({server: data,id:id }),
        onSettled: async (_, error, varaibles) => {
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ["servers"] })
                await queryClient.invalidateQueries({
                    queryKey: ["server", {  id: varaibles.id }],
                })
            };
        }
    })
}

export function useDeleteServer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: Server["_id"]) => deleteServer(id),
        onSettled: async (_, error) => {
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ["servers"] })
            };
        }
    })
}