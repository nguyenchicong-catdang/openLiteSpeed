import { useState } from "react";
import { useNavigate } from "react-router";

// pages/Login.jsx
export default function Login() {
    const [errMess, setErrorMess] = useState('');
    // chuyeern huowsng
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target
        // Xóa thông báo lỗi cũ ngay khi người dùng nhấn nút submit
        setErrorMess('');
        // req server
        reqServer(form)
    }
    const reqServer = async (form) => {
        //console.log(form)
        const formData = new FormData(form)
        try {
            const response = await fetch('/api/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            const result = await response.json()
            if (!response.ok) {

                if (result.errors) {
                    const arrErros = Object.values(result.errors)
                    renderErrs(arrErros)
                }
                //console.log(result)
            } else {
                const laravelToken = result.token;
                localStorage.setItem('laravel_token', laravelToken)
                //console.log(laravelToken)
                navigate('/')
            }
        } catch (err) {
            console.error(err)
        }
    }
    const renderErrs = (arrErros) => {

        setErrorMess(arrErros.map((err, index) =>
            <p style={{color:'red', margin: '5px'}} key={index}>{err}</p>
        ))
    }
  return (
      <form onSubmit={handleSubmit}>
          Username: <input type="text" name="username" /> <br />
          Password: <input type="password" name="password" /><br />
          <button type="submit">Login React</button>
          <div className="err-mess">{errMess}</div>
    </form>
  )
}
