import axios from '../api/axios';
import useAuth from './useAuth';


const useRefreshToken = () => {
  const {setAuth} = useAuth();                                      // useAuth hook'undan setAuth fonksiyonunu çağırıyoruz  
  
    const refresh = async () => {                                   // refresh fonksiyonu oluşturuyoruz
        const response = await axios.get('/refresh', {              // refresh token isteği
            withCredentials: true                                   // withCredentials: true,   // 2. istek için gerekli
        })      
        // javascript kodumuzun içinde asla görmediğimiz güvenli bir tanımlama bilgisidir. ancak axios onu backende gönderir.
        setAuth(prev => {                                           // setAuth fonksiyonu ile auth state'ini güncelliyoruz
            console.log(JSON.stringify(prev))                       // console.log(JSON.stringify(prev))   // 1. istek için gerekli
            console.log(response.data.accessToken);                 // console.log(response.data.accessToken);   // 2. istek için gerekli
            return { ...prev, accessToken: response.data.accessToken}  
        })
        return response.data.accessToken;                           //isteği yeniden deneyeceğiz
    }
    return refresh;

    
}

export default useRefreshToken