import Modal from "./Modal";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import { createUserAPI } from "../../api/usersAPI";
import {
	selectIsCreatingUser,
	selectShowAddUserModal,
	setShowAddUserModal,
} from "../../state/slices/users";
import CustomPhoneInput from "../inputs/CustomPhoneInput";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CreateUserModal = () => {
	const dispatch = useAppDispatch();

	const isCreatingUser = useAppSelector(selectIsCreatingUser);
	const showAddUserModal = useAppSelector(selectShowAddUserModal);

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const addUser = async ({
		email,
		mobileNumber,
		firstName,
		lastName,
		username,
		password,
	}: FieldValues) => {
		dispatch(
			createUserAPI({
				email,
				mobileNumber,
				firstName,
				surname: lastName,
				username,
				password,
			})
		);
	};
	return (
		<Modal
			closeModal={() => {
				dispatch(setShowAddUserModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(addUser)}>
					{/* First Name */}
					<div className="">
						<label htmlFor="firstName" className="mb-2 block">
							<p className="text-[#222222] text-sm">First Name</p>
						</label>
						<Input
							id="firstName"
							type="text"
							placeholder="Enter first name"
							{...register("firstName", {
								required: "First name is required",
							})}
							className={`w-full input ${errors?.firstName ? "invalid" : ""}`}
						/>
						{errors?.firstName && (
							<ErrorMessage message={errors.firstName.message?.toString()} />
						)}
					</div>

					{/* Last Name */}
					<div className="mt-5">
						<label htmlFor="lastName" className="mb-2 block">
							<p className="text-[#222222] text-sm">Last Name</p>
						</label>
						<Input
							id="lastName"
							type="text"
							placeholder="Enter last name"
							{...register("lastName", {
								required: "Last name is required",
							})}
							className={`w-full input ${errors?.lastName ? "invalid" : ""}`}
						/>
						{errors?.lastName && (
							<ErrorMessage message={errors.lastName.message?.toString()} />
						)}
					</div>

					{/* Email */}
					<div className="mt-5">
						<label htmlFor="email" className="mb-2 block">
							<p className="text-[#222222] text-sm">Email</p>
						</label>
						<Input
							id="email"
							type="text"
							{...register("email", {
								required: "Email is required",
							})}
							placeholder="Enter first name"
							className={`w-full input ${errors?.email ? "invalid" : ""}`}
						/>
						{errors?.email && (
							<ErrorMessage message={errors.email.message?.toString()} />
						)}
					</div>

					{/* Phone Number */}
					<div className="mt-5">
						<label htmlFor="mobileNumber" className="mb-2 block">
							<p className="text-[#222222] text-sm">Phone number</p>
						</label>
						<Controller
							control={control}
							name="mobileNumber"
							rules={{
								required: "Please enter your phone number",
							}}
							render={({ field: { onChange, value } }) => (
								<CustomPhoneInput
									onChange={onChange}
									value={value}
									defaultCountry="NG"
									placeholder="Your phone number"
									className={errors.mobileNumber ? "invalid" : ""}
								/>
							)}
						/>
						{errors?.mobileNumber && (
							<ErrorMessage
								message={
									errors?.mobileNumber &&
									errors?.mobileNumber.message?.toString()
								}
							/>
						)}
					</div>

					{/* Username */}
					<div className="mt-5">
						<label htmlFor="username" className="mb-2 block">
							<p className="text-[#222222] text-sm">Username</p>
						</label>
						<Input
							id="username"
							type="text"
							placeholder="Enter first name"
							{...register("username")}
							className={`w-full input ${errors?.username ? "invalid" : ""}`}
						/>
						{errors?.username && (
							<ErrorMessage message={errors.username.message?.toString()} />
						)}
					</div>

					{/* Passowrd */}
					<div className="mt-5">
						<label htmlFor="password" className="mb-2 block">
							<p className="text-[#222] text-sm">Password</p>
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

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isCreatingUser}
					/>
				</form>
			}
			isOpen={showAddUserModal}
			title="Add User"
		/>
	);
};

export default CreateUserModal;
