/* eslint-disable no-mixed-spaces-and-tabs */
import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/DashboardLayout";
import { P } from "../../../components/Texts";
import { useNavigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import ErrorMessage from "../../../components/ErrorMessage";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getSpecificClubTeamAPI, updateTeamAPI } from "../../../api/teamsAPI";
import { convertToBase64 } from "../../../utils/utils";
import { toastError } from "../../../utils/toast";
import {
	selectIsFetchingSpecificTeam,
	selectIsUpdatingSpecificTeam,
	selectSpecificTeam,
} from "../../../state/slices/teams";
import PageLoading from "../../../components/PageLoading";
import { useMemo } from "react";

const EditClubTeam = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { clubId } = useParams();

	const specificClub = useAppSelector(selectSpecificTeam);
	const isFetchingClub = useAppSelector(selectIsFetchingSpecificTeam);

	const updatingTeam = useAppSelector(selectIsUpdatingSpecificTeam);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const logo = watch("logo");

	const updateTeam = async ({ name, shortName, logo }: FieldValues) => {
		try {
			const clubLogo = await convertToBase64(logo?.[0]);
			dispatch(updateTeamAPI({ name, shortName, clubLogo, clubId }));
		} catch (error) {
			console.log(error);
			toastError("An error occured! Please try again");
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => dispatch(getSpecificClubTeamAPI({ clubId })), [clubId]);

	return (
		<DashboardLayout title="Fixture management - Add new team">
			<main className="p-8 grid md:grid-cols-11 gap-4">
				{isFetchingClub ? (
					<div className="col-span-12 py-40 ">
						<PageLoading />
					</div>
				) : (
					<form
						onSubmit={handleSubmit(updateTeam)}
						className="col-span-12 lg:col-span-5"
					>
						<section className="bg-white rounded p-8 shadow-md">
							{/* Name */}
							<div className="">
								<label htmlFor="name" className="mb-2 block">
									<P className="text-[#222222] text-sm">Club Name</P>
								</label>
								<Input
									id="name"
									type="text"
									placeholder="Enter club name"
									{...register("name", {
										required: "Club name is required",
									})}
									defaultValue={specificClub?.name}
									className={`w-full input ${errors?.name ? "invalid" : ""}`}
								/>
								{errors?.name && (
									<ErrorMessage message={errors.name.message?.toString()} />
								)}
							</div>

							{/* Short Name (Abbreviation) */}
							<div className="mt-6">
								<label htmlFor="shortName" className="mb-2 block">
									<P className="text-[#222222] text-sm">
										Short Name (Abbreviation)
									</P>
								</label>
								<Input
									id="shortName"
									type="text"
									placeholder="Enter club short name"
									{...register("shortName", {
										required: "Short name is required",
									})}
									className={`w-full input ${
										errors?.shortName ? "invalid" : ""
									}`}
									defaultValue={specificClub?.shortName}
								/>
								{errors?.shortName && (
									<ErrorMessage
										message={errors.shortName.message?.toString()}
									/>
								)}
							</div>

							{/* Club Logo */}
							<div className="mt-6 text-sm">
								<P className="text-[#222222] text-sm mb-2 block">Club Logo</P>

								<label
									htmlFor="logo"
									className={
										logo?.[0]?.name
											? `relative rounded-lg  border py-3 px-4 flex items-center mt-2 cursor-pointer w-full ${
													errors?.logo
														? "border-[#d52a2a] bg-[#d52a2a40]"
														: "border-[#dbdfe6] bg-[#F5F6F8]"
											  }`
											: `relative rounded-lg border border-dashed py-3 px-7 flex items-center justify-center mt-2 cursor-pointer w-full ${
													errors?.logo
														? "border-[#d52a2a] bg-[#d52a2a40]"
														: "border-[#dbdfe6] bg-[#F5F6F8]"
											  }`
									}
								>
									<input
										type="file"
										id="logo"
										accept="image/*"
										{...register("logo", {
											required: "Logo is required",
										})}
										className="w-full h-full absolute top-0 opacity-0 cursor-pointer"
									/>
									{logo?.[0]?.name ? (
										<div className="flex items-center justify-between gap-14 w-full">
											<p className="">{logo?.[0]?.name}</p>
											<button onClick={() => {}}>
												<AiOutlineClose size={14} color="#D52A2A" />
											</button>
										</div>
									) : (
										<>
											<AiOutlineCloudUpload
												color={errors?.logo ? "#eb1536" : "#6D7786"}
												size={20}
											/>
											<p
												className={`text-[#6D7786] ml-2.5 ${
													errors?.logo ? "text-[#eb1536]" : ""
												}`}
											>
												Choose file
											</p>
										</>
									)}
								</label>
								{errors?.logo && (
									<ErrorMessage message={errors.logo.message?.toString()} />
								)}
							</div>
						</section>

						<div className="flex items-center justify-end space-x-4 mt-8">
							<Button.Outline title="Back" onClick={() => navigate(-1)} />
							<Button type="submit" title="Save" loading={updatingTeam} />
						</div>
					</form>
				)}
			</main>
		</DashboardLayout>
	);
};

export default EditClubTeam;
