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
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 p-4">
         <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-sm flex flex-col gap-5"
         >
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
               Đăng nhập
            </h2>

            {/* Username Field */}
            <div className="flex flex-col gap-1.5">
               <label className="text-sm font-semibold text-gray-600 ml-1">
                  Username
               </label>
               <input
                  type="text"
                  name="username"
                  placeholder="Nhập tài khoản"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
               />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
               <label className="text-sm font-semibold text-gray-600 ml-1">
                  Password
               </label>
               <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
               />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors active:scale-[0.98] mt-2"
            >
               Login React
            </button>

            {/* Error Message */}
            {errMess && (
               <div className="err-mess text-red-500 text-sm font-medium text-center bg-red-50 py-2 rounded-md border border-red-100">
                  {errMess}
               </div>
            )}
         </form>
      </div>
   );
}
