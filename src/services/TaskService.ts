import axios from "axios"
import { Task, TaskDto } from "../Type";

const url : String | undefined = process.env.REACT_APP_DEFAULT

export const getAllTasks = async(): Promise<Task[]> => {
    try{
        let respones = await axios.get(`${url}/Task`);
        return respones.data;
    }catch(err){
        throw new Error((err as Error).message)
    }
}

export const getTaskById = async(id : String) : Promise<Task>=>{
    try{
        let respones = await axios.get(`${url}/Task/${id}`);
        return respones.data;
    }catch(err){
        throw new Error((err as Error).message)
    }
}

export const createTask = async(task : TaskDto) : Promise<Boolean>=>{
    try{
        let respones = await axios.post(`${url}/Task/create-task`,task);
        return respones.data;
    }catch(err){
        throw new Error((err as Error).message)
    }
}

export const updateTask = async(task : Task) : Promise<Boolean>=>{
    try{
        let respones = await axios.put(`${url}/Task/update-task`,task);
        return respones.data;
    }catch(err){
        throw new Error((err as Error).message)
    }
}

export const deleteTask = async(id :String) : Promise<Boolean>=>{
    try{
        let respones = await axios.delete(`${url}/Task/${id}`);
        return respones.data;
    }catch(err){
        throw new Error((err as Error).message)
    }
}