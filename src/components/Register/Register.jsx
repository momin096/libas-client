import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        console.log("Register Data:", data);
        // TODO: Handle registration logic here
    };

    const handleGoogleRegister = () => {
        console.log("Google Register Triggered");
        // TODO: Add Google OAuth here
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-sm p-8 border border-gray-300 rounded-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6">Create a New Account</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

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

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 pb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
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

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 pb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value =>
                                            value === watch("password") || "Passwords do not match",
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Register
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-2 my-4">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <span className="text-sm text-gray-400">or</span>
                        <div className="h-px bg-gray-300 flex-1"></div>
                    </div>

                    {/* Google Sign-Up */}
                    <button
                        onClick={handleGoogleRegister}
                        className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50/90 transition"
                    >
                        <FcGoogle size={20} />
                        <span className="text-sm font-medium">Continue with Google</span>
                    </button>

                    <p className="text-center text-sm text-gray-800 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-gray-900 font-medium hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
