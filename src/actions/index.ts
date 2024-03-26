import axios from "axios"
import uuid from "react-uuid"

export const getCode = async () =>{
    try {
        const {data} = await axios(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`)
        console.log(data)
        return data
    } catch (error) {
        return console.error(error)
    }
}

export const createCode = async () =>{
    try {
        const {status} = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/code`,{
            createdAt: new Date(),
            code_masuk: uuid(),
            code_keluar: uuid()
        })
        return status
    } catch (error) {
        return console.error(error)
    }
}