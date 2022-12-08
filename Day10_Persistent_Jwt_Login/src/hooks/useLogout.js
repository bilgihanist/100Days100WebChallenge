import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();


    //oturum kapatıldığında auth'u boş birnesnye ayarlayıp sonra mevcut kapalı state'i boşaltmak istiyoruz.
    const logout = async () => {
        setAuth({}); //auth state'ini boş bir nesneye ayarlıyoruz
        try {
            const response = await axios('/logout', {
                withCredentials: true
            })
        }catch (err) {
            console.log(err);
        }
    }
    return logout;
}

export default useLogout