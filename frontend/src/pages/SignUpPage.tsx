import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignupPage() {
    const { signup } = useAuthStore();
    const [role, setRole] = useState<string>("basic"); // Default to 'basic'
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signup({ username, password, role });
    };

    return (
        <>
        <Navbar/>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Select your role
                                    </label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={handleRoleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="basic">Basic User</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign up
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <Link to={"/login"} className='text-blue-500 hover:underline'>
							Sign in
						</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
