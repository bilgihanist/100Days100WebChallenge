import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  // useAxiosPrivate fonksiyonu oluşturuyoruz
  const refresh = useRefreshToken(); // useRefreshToken hook'undan refresh fonksiyonunu çağırıyoruz
  const { auth } = useAuth(); // useAuth hook'undan auth state'ini çağırıyoruz

  useEffect(() => {
    //useffecti hooka bağlamak için bir fonksiyon oluşturuyoruz

    //REQUEST INTTERRUPTOR
    const requestIntercept = axiosPrivate.interceptors.request.use(
      //config.header olup olmadığını söyleyiyoruz ve ayarlanmış olabilecek yetkilendirmeyi kontrol ediyoruz.
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`; // accestokeni stateden al, böylece oturum aç.ıldığında başlangıçta bize verilen accestoken olabilir
        }
        return config;
      },
      (error) => Promise.reject(error) // hata olursa promise.reject ile hata döndürüyoruz
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // önce yanıt önleyici ekleyelim
      (response) => response,
      async (error) => {
        // kısa ömürlü accstoken var , eğer süresi dolduysa refresh token ile yeniden istek yapılacak
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // hata yanıt durumunu kontrol et, süresi dolmuş accestoken varsa "custom property" gönderilen yoksa veya doğru değilse
          // burada bu if ifadesinin içinde yaptığımız ilk şey olarak gönderilen istek noktasını true olarak ayarlamak istiyoruz
          prevRequest.sent = true; // gönderilen istek noktasını true olarak ayarlıyoruz
        const newAccessToken = await refresh(); // bu if ifadesinin içindeki ikinci şey olarak ise refresh token ile yeni bir istek göndererek accestoken elde ediyoruz
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // bu yeni istek için bir önceki isteği tekrar göndermek istiyoruz
        return axiosPrivate(prevRequest); //isteği refreshtoken ile güncelledik accestokenumuz olamlı

        //interceptorlar sadece kendilerini kaldırmıyorlar birikebilir ve onları çıkarmasaydık bu interceptorlar sürekli çoğalacaktı.
      }
        return Promise.reject(error); // hata olursa promise.reject ile hata döndürüyoruz  if bloğu çalışmazsa hata döndür.
    }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept); // interceptorları kaldırıyoruz 
      axiosPrivate.interceptors.response.eject(responseIntercept); // interceptorları kaldırıyoruz cleanup function ile
    };
  }, [auth, refresh]);

  return axiosPrivate; // axiosPrivate'ı döndürüyoruz
};

export default useAxiosPrivate;
