import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupAPI } from '../../api/AuthenticationAPI';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa6';


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidUsername = (username) => /^[a-zA-Z0-9_]+$/.test(username);

const Signup = () => {
    const navigate = useNavigate();
    const [form, setform] = useState({
        username: "",
        email: "",
        password: "",
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

        if (form.username.trim() === '') {
            setError("Please enter a username.");
            return;
        }


        if (!isValidUsername(form.username.trim())) {
            setError("Username must be 3–20 characters and only contain letters, numbers, or underscores.");
            return;
        }

        if (form.password.trim() === '') {
            setError("Please enter a password.");
            return;
        }


        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await signupAPI(form);
            if (res.success) {
                setform({ username: "", email: "", password: "" });
                navigate("/login");
            } else {
                setError(res.msg || "Registration failed. Please try again.");
            }
        } catch (e) {
            setError("Something went wrong. Please try again.");
            console.error("Signup failure:", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-bgclr flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='p-2 sm:p-10'>
                <div className='flex flex-col items-center justify-center gap-4 p-4 sm:p-8 bg-navbgclr text-amber-50 min-w-2xs rounded-2xl border border-white/5 shadow-xl'>

                    <div className='text-4xl text-[#ffffff] font-bold mb-2'>
                        <h1>Sign up</h1>
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
                            autoComplete="email"
                        />
                    </div>

                    <div className='group relative flex items-center w-3xs bg-[#1a1a1a] border border-[#333] rounded-[25px] pt-0.5 pb-0.5 pr-1.5 pl-3.5 mb-2 transition-colors duration-300 ease-in-out focus-within:border-[#00e6e6]'>
                        <div className='absolute text-xl text-gray-500 group-focus-within:text-[#00e6e6] transition-colors'><FaUser /></div>
                        <input
                            className='flex-1 text-center bg-transparent border-none text-white outline-none text-sm min-w-0 py-2 px-6'
                            type="text"
                            placeholder="Username"
                            name='username'
                            value={form.username}
                            onChange={handleChange}
                            autoComplete="username"
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
                            autoComplete="new-password" 
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
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>

                    <div className='text-[#b3b3b3] hover:text-[#00e6e6] text-sm transition-colors mt-2'>
                        <Link to="/login">Already have an Account? Sign in</Link>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Signup;