import axios from "axios"

export default class CurriculumVitaeService {
     getByUserId(userId) {
         return axios.get("http://localhost:8080/api/curriculumVitaes/getByUserId?userId=" + userId)
     }
}