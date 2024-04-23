import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from "react-select";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import TabNav from "../../../components/layout/TabNav";
import { Input } from "../../../components/inputs/Input";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import Button from "../../../components/Buttons";
import IndicatorSeparator from "../../../components/IndicatorSeparator";
import { selectIsCreatingPrivateLeague } from "../../../state/slices/privateLeague";
import { createPrivateLeagueAPI } from "../../../api/privateLeagueAPI";
import { useEffect, useMemo, useState } from "react";
import { getAllSeasonsAPI, getAllWeeksAPI } from "../../../api/fixturesAPI";
import {
	selectAllSeasons,
	selectAllWeeks,
	selectIsFetchingAllSeasons,
	selectIsFetchingAllWeeks,
} from "../../../state/slices/fixtures";
import { defaultStyle, invalidStyle } from "../../../utils/selectStyle";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
	createPositionsArray,
	formatSharingFormular,
} from "../../../utils/utils";
import SharingFormularInput from "../../../components/inputs/SharingFormularInput";

const CreatePrivateLeague = () => {
	const dispatch = useAppDispatch();

	const seasons = useAppSelector(selectAllSeasons);
	const weeks = useAppSelector(selectAllWeeks);
	const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
	const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
	const isCreatingPrivateLeague = useAppSelector(selectIsCreatingPrivateLeague);

	const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);
	const [positions, setPositions] = useState<number[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
		resetField,
		unregister,
	} = useForm();

	const submit = async (data: FieldValues) => {
		let sharingFormula;
		if (Number(data.winningPositions) > 0) {
			sharingFormula = formatSharingFormular(data);
		} else {
			sharingFormula = formatSharingFormular({
				"position-1": "50",
				"position-2": "30",
				"position-3": "20",
			});
		}

		dispatch(
			createPrivateLeagueAPI({
				name: data.name,
				scoringStarts: Number(data.scoringStarts.id),
				entranceFee: Number(data.entranceFee ?? 0),
				numberOfPlayers: Number(data.numberOfPlayers ?? 10),
				winningPositions: Number(data.winningPositions ?? 3),
				sharingFormula,
			})
		);
	};

	const season = watch("season");
	const winningPositions = watch("winningPositions");

	useMemo(
		() => setPositions(createPositionsArray(Number(winningPositions) ?? 3)),
		[winningPositions]
	);

	useEffect(() => {
		dispatch(getAllSeasonsAPI({}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(getAllWeeksAPI({ seasonId: season?.id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [season?.id]);

	return (
		<DashboardLayout title="Private League - Create">
			<section className="predictbeta-header px-4 lg:px-8 pt-6 flex items-center">
				<TabNav
					tabs={[
						{
							path: "/dashboard/private-league/create",
							title: "Create new league",
						},
						{
							path: "/dashboard/private-league/join",
							title: "Join existing league",
						},
					]}
				/>
			</section>
			<main className="px-4 py-8 lg:p-8 grid md:grid-cols-11 gap-4">
				<form
					onSubmit={handleSubmit(submit)}
					className="col-span-12 lg:col-span-5 bg-white rounded-lg p-4 lg:p-6 shadow-md"
				>
					<h3 className="text-[#212934] font-semibold mb-1">
						Create new league
					</h3>
					<p className="text-sm text-[#5F6B7A]">
						By default, prizes go to the top 3 winners at the end of each match
						week. You can also use the advanced settings feature for more
						flexibility.
					</p>

					<hr className="my-4" />

					{/* League Name */}
					<div className="">
						<label htmlFor="name" className="mb-2 block">
							<p className="text-[#222222] text-sm">League name</p>
						</label>
						<Input
							id="name"
							type="text"
							placeholder="Enter league name"
							{...register("name", {
								required: "League name is required",
							})}
							className={`w-full input ${errors?.name ? "invalid" : ""}`}
						/>
						{errors?.name && (
							<ErrorMessage message={errors.name.message?.toString()} />
						)}
					</div>

					<div className="mt-5">
						<p className="text-[#222222] text-sm mb-2">Scoring Starts</p>
						<div className="grid md:grid-cols-2 gap-4">
							{/* Season */}
							<div>
								{/* <label htmlFor="season" className="mb-2 block">
									<p className="text-[#222222] text-sm">Season</p>
								</label> */}
								<Controller
									control={control}
									name="season"
									rules={{
										required: "Select a season",
									}}
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={seasons}
											value={value}
											isLoading={isFetchingSeasons}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["name"]}
											maxMenuHeight={300}
											placeholder="Season"
											classNamePrefix="react-select"
											styles={errors?.season ? invalidStyle : defaultStyle}
										/>
									)}
								/>
								{errors?.season && (
									<ErrorMessage
										message={
											errors?.season && errors?.season.message?.toString()
										}
									/>
								)}
							</div>

							{/* Week */}
							<div>
								{/* <label htmlFor="week" className="mb-2 block">
									<p className="text-[#222222] text-sm">Week</p>
								</label> */}
								<Controller
									control={control}
									name="scoringStarts"
									rules={{
										required: "Select a week",
									}}
									render={({ field: { onChange, value, ref } }) => (
										<Select
											ref={ref}
											onChange={onChange}
											options={weeks}
											value={value}
											isLoading={isFetchingWeeks}
											components={{
												// DropdownIndicator,
												IndicatorSeparator,
											}}
											getOptionValue={(option) => option["id"]}
											getOptionLabel={(option) => option["number"]}
											maxMenuHeight={300}
											placeholder="Week"
											classNamePrefix="react-select"
											styles={
												errors?.scoringStarts ? invalidStyle : defaultStyle
											}
										/>
									)}
								/>
								{errors?.scoringStarts && (
									<ErrorMessage
										message={
											errors?.scoringStarts &&
											errors?.scoringStarts.message?.toString()
										}
									/>
								)}
							</div>
						</div>
					</div>

					{/* Entrance Fee */}
					<div className="mt-5">
						<label htmlFor="entranceFee" className="mb-2 block">
							<p className="text-[#222222] text-sm">Entrance fee</p>
						</label>
						<Input
							id="entranceFee"
							type="number"
							placeholder="How much should players pay to join the league?"
							min={0}
							{...register("entranceFee", {
								min: {
									value: 0,
									message: "Please enter a valid number",
								},
							})}
							className={`w-full input ${errors?.fee ? "invalid" : ""}`}
						/>
						{errors?.fee && (
							<ErrorMessage message={errors.fee.message?.toString()} />
						)}
					</div>

					{/* Additional Settings */}
					<button
						type="button"
						className="text-[#EB1536] text-sm mt-5 flex items-center gap-2.5"
						onClick={() => {
							setShowAdditionalSettings(!showAdditionalSettings);
							resetField("numberOfPlayers");
							resetField("winningPositions");
						}}
					>
						<p>Advanced settings</p>
						{showAdditionalSettings ? <FaCaretUp /> : <FaCaretDown />}
					</button>

					{showAdditionalSettings && (
						<>
							{/* Total number of players */}
							<div className="mt-5">
								<label htmlFor="numberOfPlayers" className="mb-2 block">
									<p className="text-[#222222] text-sm">
										Total number of players
									</p>
								</label>
								<Input
									id="numberOfPlayers"
									type="number"
									min={0}
									placeholder="How many players would be in this league?"
									{...register("numberOfPlayers", {
										required: "Required field",
										min: {
											value: 0,
											message: "Please enter a valid number",
										},
									})}
									className={`w-full input ${
										errors?.numberOfPlayers ? "invalid" : ""
									}`}
								/>
								{errors?.numberOfPlayers && (
									<ErrorMessage
										message={errors.numberOfPlayers.message?.toString()}
									/>
								)}
							</div>

							{/* Winning positions */}
							<div className="mt-5">
								<label htmlFor="winningPositions" className="mb-2 block">
									<p className="text-[#222222] text-sm">Winning positions</p>
								</label>
								<Input
									id="winningPositions"
									type="number"
									placeholder="How many winners at the end?"
									min={0}
									{...register("winningPositions", {
										min: {
											value: 0,
											message: "Please enter a valid number",
										},
									})}
									className={`w-full input ${
										errors?.winningPositions ? "invalid" : ""
									}`}
								/>
								{errors?.winningPositions && (
									<ErrorMessage
										message={errors.winningPositions.message?.toString()}
									/>
								)}
							</div>

							{/* Sharing Formular */}
							{positions.length > 0 && (
								<>
									<div className="mt-2 grid grid-cols-4 gap-2">
										{positions.map((position) => (
											<div key={position}>
												<SharingFormularInput
													errors={errors}
													position={position}
													unregister={unregister}
													{...register(`position-${position}`, {
														required: "required field",
													})}
												/>
											</div>
										))}
									</div>
								</>
							)}
						</>
					)}

					<Button
						type="submit"
						title="Create league"
						className="mt-5 w-full"
						loading={isCreatingPrivateLeague}
					/>

					<Link to="/dashboard/private-league/join">
						<p className="text-[#212934] font-medium text-sm text-center mt-6">
							Join an existing league instead
						</p>
					</Link>
				</form>
			</main>
		</DashboardLayout>
	);
};

export default CreatePrivateLeague;
