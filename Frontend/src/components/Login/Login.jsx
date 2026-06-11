import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginAPI } from '../../api/AuthenticationAPI';
import { useAuth } from '../../Context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa6'

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setform] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        
        if (form.email.trim() === '') {
            setError("Please enter your email.");
            return;
        }

        if (!isValidEmail(form.email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        if (form.password === '') {
            setError("Please enter your password.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await LoginAPI(form);

            if (res.success) {
                login({ name: res.username, role: res.role, avatarURL: res.avatar });

                if (res.role === 'admin') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }

                setform({ email: "", password: "" });
            } else {
                setError(res.msg || "Invalid credentials provided.");
            }
        } catch (e) {
            setError("Something went wrong. Please try again.");
            console.error("Login failure:", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-bgclr flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='p-2 sm:p-10'>
                <div className='flex flex-col items-center justify-center gap-4 p-4 sm:p-8 bg-navbgclr text-amber-50 min-w-2xs rounded-2xl border border-white/5 shadow-xl'>

                    <div className='text-4xl text-[#ffffff] font-bold mb-2'>
                        <h1>Sign in</h1>
                    </div>

                    <div className='group relative flex items-center w-3xs bg-[#1a1a1a] border border-[#333] rounded-[25px] pt-0.5 pb-0.5 pr-1.5 pl-3.5 mb-2 transition-colors duration-300 ease-in-out focus-within:border-[#00e6e6]'>
                        <div className='absolute text-xl text-gray-500 group-focus-within:text-[#00e6e6] transition-colors'><FaEnvelope /></div>
                        <input
                            className='flex-1 text-center bg-transparent border-none text-white outline-none text-sm min-w-0 py-2 px-6'
                            type="email"
                            placeholder="Email"
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='group relative flex items-center w-3xs bg-[#1a1a1a] border border-[#333] rounded-[25px] pt-0.5 pb-0.5 pr-1.5 pl-3.5 transition-colors duration-300 ease-in-out focus-within:border-[#00e6e6]'>
                        <div className='absolute text-xl text-gray-500 group-focus-within:text-[#00e6e6] transition-colors'><FaLock /></div>
                        <input
                            className='flex-1 text-center bg-transparent border-none text-white outline-none text-sm min-w-0 py-2 px-6'
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className='text-[#ff4d4d] text-sm font-semibold text-center max-w-3xs transition-all'>
                            <p>{error}</p>
                        </div>
                    )}

                    <div>
                  
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-transparent border border-[#00e6e6] text-[#00e6e6] py-2 px-5 rounded font-bold whitespace-nowrap cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#00e6e6] hover:text-[#1a1e24] w-3xs disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Signing in..." : "Log In"}
                        </button>
                    </div>

                    <div className='text-[#b3b3b3] hover:text-[#00e6e6] text-sm transition-colors mt-2'>
                        <Link to="/signup">Don't have an Account? Sign up</Link>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Login;
