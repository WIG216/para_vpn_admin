

type Server = {
    _id: string,
    name: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
}

type ApiResponse<T> = {
    message: string
}&({
    status: "Success",
    data: T
}| {
    status: "Failure"
})