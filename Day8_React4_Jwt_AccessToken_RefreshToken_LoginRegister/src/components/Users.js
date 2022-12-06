import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";


const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();



  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // AbortController is a built-in browser API (Axios)  isteği iptal edebilmek için

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data); //axiosdan gelen yanıt data özelliklerine sahip olacak ve bu data özelliklerini kullanacağız
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', {state: { from: location }, replace: true});
      }
    };
    getUsers();
    return () => {
      //Temizleme işleme yapılacak
      isMounted = false; //isMounted false olacak
      controller.abort();
      //controller iptal edilecek   // beklemede olan tüm istekler ipta edilecek
    };
  }, []);

  return (
    <article>
      <h2>User List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
