export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"

export function signIn(result) {
    return {
        type : SIGN_IN, //Hangi reducer'ın çalışacağı type ismine göre belirlenir. Eğer aynı type'da iki reducer yazarsan ikisi de çalışır. O yüzden type tekil olmalıdır.
        payload: result 
    }
}

export function signOut() { // Buna herhangi bir parametre vermedik. Çünkü sadece mevcut store değerlerini sıfırlama yapılacak
    return {
        type : SIGN_OUT        
    }
}

