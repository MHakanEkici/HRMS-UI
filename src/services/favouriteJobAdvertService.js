import axios from "axios"

export default class FavouriteJobAdvertService {
    getFavouriteJobAdverts(userId) {
        return axios.get("http://localhost:8080/api/favouriteJobAdverts/getByUserId?userId="  + userId)
    }

    // add(values){
    //     return axios.post("http://localhost:8080/api/favouriteJobAdverts/addFavouriteJobAdvert",values)
    // }

    add(userId,jobAdvertId){
        return axios.post(`http://localhost:8080/api/favouriteJobAdverts/addFavouriteJobAdvert?jobAdvertId=${jobAdvertId}&userId=${userId}`)
    }

}