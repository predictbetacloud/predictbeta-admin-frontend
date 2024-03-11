import Modal from "./Modal";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";

import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import { IUser } from "../../types/types";
import { updateUserAPI } from "../../api/usersAPI";
import {
	selectIsEditingUser,
	selectShowEditUserModal,
	setShowEditUserModal,
} from "../../state/slices/users";
import CustomPhoneInput from "../inputs/CustomPhoneInput";

const EditUserModal = ({ user }: { user: IUser | undefined }) => {
	const dispatch = useAppDispatch();
	const { userId } = useParams();

	const isEditingUser = useAppSelector(selectIsEditingUser);
	const showEditUserModal = useAppSelector(selectShowEditUserModal);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm();

	const editUser = async ({
		mobileNumber,
		firstName,
		lastName,
		username,
	}: FieldValues) => {
		const email = user?.email;

		dispatch(
			updateUserAPI({
				email,
				mobileNumber,
				firstName,
				surname: lastName,
				userId,
				username,
			})
		);
	};
	return (
		<Modal
			closeModal={() => {
				dispatch(setShowEditUserModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(editUser)}>
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
							defaultValue={user?.firstName}
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
							placeholder="Enter first name"
							{...register("lastName", {
								required: "Last name is required",
							})}
							defaultValue={user?.surname}
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
							placeholder="Enter first name"
							disabled
							defaultValue={user?.email}
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
							defaultValue={user?.mobileNumber}
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
							defaultValue={user?.username}
							className={`w-full input ${errors?.username ? "invalid" : ""}`}
						/>
						{errors?.username && (
							<ErrorMessage message={errors.username.message?.toString()} />
						)}
					</div>

					<Button
						className="w-full mt-6"
						type="submit"
						title="Save"
						loading={isEditingUser}
					/>
				</form>
			}
			isOpen={showEditUserModal}
			title="Edit User"
		/>
	);
};

export default EditUserModal;
