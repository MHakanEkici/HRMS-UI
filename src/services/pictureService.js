import axios from "axios"

export default class PictureService{
     getPictures(){
         return axios.get("http://localhost:8080/api/pictures/getAll")
     }

     uploadPicture(userId, formData) {
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
          }
        return axios.post("http://localhost:8080/api/pictures/upload?userId=" + userId, formData, config)
     }
}