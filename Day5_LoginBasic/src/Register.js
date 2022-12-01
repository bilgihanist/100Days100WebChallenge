import { useRef, useState, useEffect } from "react";
import { faCheck,  faTimes,  faInfoCircle,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // küçük büyük ve rakam içeren isim olmalı 3-23 karakter arası olmalı
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // küçük büyük rakam ve özel karakter içeren şifre olmalı 8-24 karakter arası olmalı

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus(); // sayfa yüklendiğinde kullanıcı adı inputuna focus ver
  }, []);

  useEffect(() => {
    // kullanıcı adı kontrolü
    const result = USER_REGEX.test(user); // regex ile kontrol
    console.log(result); // true false
    console.log(user); // kullanıcı adı
    setValidName(result); // true false
  }, [user]); // user değiştiğinde çalışır

  useEffect(() => {
    // şifre kontrolü
    const result = PWD_REGEX.test(pwd); // regex ile kontrol
    console.log(result); // true false
    console.log(pwd); // şifre
    setValidPwd(result); // true false
    const match = pwd === matchPwd; // şifreler eşleşiyor mu
    setValidMatch(match); // true false
  }, [pwd, matchPwd]); // pwd ve matchPwd değiştiğinde çalışır

  useEffect(() => {
    // hata mesajı kontrolü
    setErrMsg(""); // hata mesajı boş
  }, [user, pwd, matchPwd]); // user, pwd, matchPwd değiştiğinde çalışır


    const handleSubmit = async (e) => {
        e.preventDefault();

        //if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try{
            const response = await axios.posrt()
        }
        catch (err) {
            
        }
    }

  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <a href= "#">Sign In</a>
            </p>
        </section>
    ):(
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>{" "}
      {/* hata mesajı */}
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef} /* kullanıcı adı inputuna focus vermek için */
          autoComplete="off" /* tarayıcıdan otomatik doldurma kapat */
          onChange={(e) =>
            setUser(e.target.value)
          } /* kullanıcı adı değiştiğinde setUser çalışır */
          required /* boş bırakılamaz */
          aria-invalid={
            validName ? "false" : "true"
          } /* kullanıcı adı regex ile doğruysa aria-invalid false değilse true */
          aria-describedby="uidnote" /* kullanıcı adı regex ile doğruysa uidnote offscreen değilse uidnote açık */
          onFocus={() =>
            setUserFocus(true)
          } /* kullanıcı adı inputuna focus geldiğinde setUserFocus true */
          onBlur={() =>
            setUserFocus(false)
          } /* kullanıcı adı inputundan focus çıktığında setUserFocus false */
        />

        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores,hyphens allowed.
        </p>

        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must contain at least one uppercase letter, one lowercase letter, one
          number, and one special character.
          <br />
          Allowed special characters:
          <span aria-label="exclamation mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
      </form>
        <p>
            Already registered? <br />

            <span className="line">
                {/*put router link here*/}
                <a href="#">Sign In</a>
            </span>
        </p> 
    </section>
    )
    }
    </>
  );
};

export default Register;
