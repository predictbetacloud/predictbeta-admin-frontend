import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import logo from "../../assets/logo/logo-dark.svg";

import ErrorMessage from "../../components/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/Input";
import Button from "../../components/Buttons";

import { loginAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";

const Login = () => {
	const dispatch = useAppDispatch();
	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	const [showPassword, setShowPassword] = useState(false);

	// Form Handler
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Form Submission Handler
	const submit = ({ email, password }: FieldValues) => {
		console.log(email, password);
		dispatch(loginAPI({ email, password }));
	};

	return (
		<main className="w-screen h-screen bg-[#051b30] flex flex-col items-center justify-center">
			<img src={logo} alt="Predictbeta" />
			<form onSubmit={handleSubmit(submit)} className="mt-10 md:min-w-[400px]">
				{/* Email */}
				<div className="mt-5">
					<label htmlFor="email" className="mb-2 block">
						<P className="text-white text-sm">Email address</P>
					</label>
					<Input
						id="email"
						type="email"
						placeholder="Enter email"
						{...register("email", {
							required: "Enter a valid email",
						})}
						className={`w-full input ${errors?.email ? "invalid" : ""}`}
					/>
					{errors?.email && (
						<ErrorMessage message={errors.email.message?.toString()} />
					)}
				</div>

				{/* Passowrd */}
				<div className="mt-5">
					<label htmlFor="password" className="mb-2 block">
						<P className="text-white text-sm">Password</P>
					</label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter password here"
							{...register("password", {
								required: "Please enter password",
							})}
							className={`w-full input ${errors?.password ? "invalid" : ""}`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3.5 flex items-center h-full top-0"
						>
							{!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
						</button>
					</div>
					{errors?.password && (
						<ErrorMessage message={errors.password.message?.toString()} />
					)}
				</div>

				<div className="mt-5">
					<Button
						className="w-full"
						title="Log in"
						type="submit"
						loading={isPerformingAuthAction}
					/>
				</div>
			</form>
		</main>
	);
};

export default Login;
