import axios from "axios"

export default class JobAdvertService{
     getJobAdverts(){
         return axios.get("http://localhost:8080/api/jobAdverts/getAllSortedJobAdverts")
     }

     add(values){
         console.log(values)
        return axios.post("http://localhost:8080/api/jobAdverts/add",values)
    }
}