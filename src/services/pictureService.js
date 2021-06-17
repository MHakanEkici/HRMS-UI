import axios from "axios"

export default class PictureService{
     getPictures(){
         return axios.get("http://localhost:8080/api/pictures/getAll")
     }
}