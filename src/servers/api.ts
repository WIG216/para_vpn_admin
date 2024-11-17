/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axiosInstance"

export const getServers = async (): Promise<Server[]> => {
    try {
        const response = await axiosInstance({
            url: "/servers",
        })

        return response.data;
    } catch (error: any) {
        throw new Error(error.message)
    }

}

export const getServerById = async (id: string) => {
    try {
        const response = await axiosInstance({
            url: `/servers/${id}`,
        })

        return response.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const createServer = async (server: FormData) => {
    try {

        console.log("SERVER", server);
        const response = await axiosInstance({
            url: `/servers`,
            method: "POST",
            data: server,
            contentType: "multipart/form-data"
        })

        return response.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const updateServer = async ({server, id}:{server: FormData, id: string}) => {
    try {
        console.log(id)
        const response = await axiosInstance({
            url: `/servers/${id}`,
            method: "PATCH",
            data: server
        })

        return response.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteServer = async (id: string) => {
    try {
        const response = await axiosInstance({
            url: `/servers/${id}`,
            method: "DELETE"
        })

        return response.data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
