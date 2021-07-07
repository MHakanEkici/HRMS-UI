export const isLogin = false
export const isEmployer = false
export const isCandidate = false
export const isAdmin = false


 //gerçekte Candidate initial değeri {} olsun. Login olunca içini doldurcaz. 
 //Yani Login reusltının dispatch ile globalItemsdaki bu nesneyi güncellemesi ile 
 //Ben şimdilik elle dolduruyorum. Sen bunu CV page de useSelector ile çekip içindeki değerleri alacaksın ve ilgili yerlerde göstereceksin
 //Sen bu candidate değişkenine useSelector ile erişebilirsin 

export const candidate = {
      "userId": 93,
      "email": "ayse@gmail.com",
      "password": "654321",
      "confirmPassword": "654321",
      "userType": "Candidate",
      "firstName": "Ayşe",
      "lastName": "Yılmaz",
      "identityNumber": 22222222222,
      "birthDate": "1999-05-22"
}