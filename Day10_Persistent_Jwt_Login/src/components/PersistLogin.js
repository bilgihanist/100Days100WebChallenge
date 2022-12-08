import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true) // doğruysa boolean değer döndürür
  const refresh = useRefreshToken() // refresh tokenı almak için hook kullanıyoruz
  const { auth, persist } = useAuth() // auth tokenı almak için hook kullanıyoruz

  //useEffect sadece component yüklendiğine çalışacak bu yüzden boşi dependency array veriyoruz
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh() //endpoint ve cookieyi yanına al ve bize yenibir AccessT gönderir
      } catch (error) {
        // require auth componente ulaşmadan önce yapılmalı
        console.log(error)
      } finally {
        isMounted && setIsLoading(false) // sonsuz yüklemedöngüsünde girmemizi engelleyecek
      }
    }
      // bunu yalnızca AccessT olmadığında çalıştırıyoruz , korumalı bir sayfa istediğimiz her eferde refresh endpointine ulaşmak istemiyoruz. Bunu sadece AccessT olmadığında yapmak istiyoruz

      !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false); // auth yoksa verifyRefreshToken çalıştır yoksa setIsLoading false yap
  
      return () => isMounted = false;
    }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return (
    <>
      {!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
      {/* outlet ile componentleri ve child routes'ları yüklüyoruz */}
      {/* bunu tüm kısıtlı veya korumalı yollarımızın etrafına saracağız */}
    </>
  )
}

export default PersistLogin
