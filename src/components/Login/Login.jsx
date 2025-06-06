import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { logIn, signInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data) => {
        const { email, password } = data || {}

        logIn(email, password)
            .then(data => console.log(data))
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            if (result?.user) {
                const { displayName, email, photoURL } = result.user;

                const res = await axiosPublic.post(`/users/${email}`, {
                    name: displayName,
                    email,
                    image: photoURL
                });


                if (res.data.insertedId) {
                    toast.success("Register successful!");
                    toast.success("User profile created successfully!");
                }
                

                navigate('/');
            }
        } catch (err) {
            console.error(err);
            // toast.error("Google Sign-In failed!");
        }
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center  px-4">
                <div className="w-full max-w-sm p-8 border border-gray-300 rounded-2xl ">
                    <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", { required: "Email is required" })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password with show/hide */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 pb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", { required: "Password is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-4">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <span className="text-sm text-gray-400">or</span>
                        <div className="h-px bg-gray-300 flex-1"></div>
                    </div>

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50/90 transition"
                    >
                        <FcGoogle size={20} />
                        <span className="text-sm font-medium">Continue with Google</span>
                    </button>

                    <p className="text-center text-sm text-gray-800 mt-4">
                        Don’t have an account?{" "}
                        <a href="/register" className="text-gray-900 font-medium hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;