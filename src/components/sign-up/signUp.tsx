"use client";

import { signUp } from "@/services/user.service";
import { validateEmail, validatePassword } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

    const { push } = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [errors, setErrors] = useState<any>({});


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        let errorMessages: any = { ...errors };
        if (id === "email" && !validateEmail(value)) {
            errorMessages.email = "Invalid email format";
        } else if (id === "email") {
            delete errorMessages.email;
        }
        if (id === "password" && !validatePassword(value)) {
            errorMessages.password =
                "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
        }
        else if (id === "password") {
            delete errorMessages.password;
        }

        if (id === "name" && value?.length <= 3) {
            errorMessages.name = "Name should not be blank and required min 3 characters."
        }
        else if (id === "name") {
            delete errorMessages.name;
        }
        console.log(errorMessages)
        setErrors(errorMessages);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let errorMessages: any = {};

        if (!validateEmail(formData.email)) {
            errorMessages.email = "Invalid email format";
        }

        if (!validatePassword(formData.password)) {
            errorMessages.password =
                "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character";
        }

        if (formData.name?.length <= 3) {
            errorMessages.name = "Name should not be blank and required min 3 characters."
        }

        if (Object.keys(errorMessages).length > 0) {
            setErrors(errorMessages);
            return;
        }

        try {
            const res = await signUp(formData);

            if (res.code === 200) {
                toast.success(res.message, {
                    className: "bg-white text-black dark:bg-gray-800 dark:text-white",
                });
                setFormData({ name: "", email: "", password: "" });
                setTimeout(() => {
                    push("/sign-in");
                }, 2000);
            } else {
                toast.error(res.message, {
                    className: "bg-white text-black dark:bg-gray-800 dark:text-white",
                });
            }
        } catch (error) {
            toast.error("User registration failed", {
                className: "bg-white text-black dark:bg-gray-800 dark:text-white",
            });
        }


    };

    return (
        <section className="pt-20 pb-20">
            <ToastContainer />
            <div className="flex items-center justify-center">
                <div className="p-8  w-80 md:w-96 rounded-lg ">
                    <h2 className="text-4xl text-white mb-6 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-6">
                            <label
                                className="block text-gray-400 text-sm mb-2"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 text-gray-300 bg-[#224957] rounded focus:outline-none focus:ring ${errors.name
                                    ? `focus:ring-[#EB5757]`
                                    : `focus:ring-[#2BD17E]`
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-[#EB5757] text-xs mt-1.5 ml-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-400 text-sm mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 text-gray-300 bg-[#224957] rounded focus:outline-none focus:ring ${errors.email ? `focus:ring-[#EB5757]` : `focus:ring-[#2BD17E]`
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-[#EB5757] text-xs mt-1.5 ml-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-400 text-sm mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 text-gray-300 bg-[#224957] rounded focus:outline-none focus:ring ${errors.password
                                    ? `focus:ring-[#EB5757]`
                                    : `focus:ring-[#2BD17E]`
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-[#EB5757] text-xs mt-1.5 ml-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="text-[12px] text-white p-2">Already have an account? <Link href="/sign-in">sign in</Link></div>
                        <button
                            type="submit"
                            disabled={
                                errors.name || errors.password || errors.email
                            }
                            className="w-full bg-[#2BD17E] text-white py-2 rounded hover:bg-green-600 transition-colors"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
