import axios from "axios"

export default class EmployerService{
     getEmployers(){
         return axios.get("http://localhost:8080/api/users/getAllEmployers")
     }

     registerEmployer(values){
        return axios.post("http://localhost:8080/api/users/register/employer",values)
    }
}