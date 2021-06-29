import axios from "axios"

export default class CandidateService{
     getCandidates(){
         return axios.get("http://localhost:8080/api/users/getAllCandidates")
     }

     registerCandidate(values){
        return axios.post("http://localhost:8080/api/users/register/candidate",values)
    }

     logInCandidate(values){
       return axios.post("http://localhost:8080/api/users/logIn/candidate",values)
   }
}