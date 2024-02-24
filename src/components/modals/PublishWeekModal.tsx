import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import {
	selectIsPublishingWeek,
	selectShowPublishWeekModal,
	setShowPublishWeekModal,
} from "../../state/slices/fixtures";
import { publishWeekAPI } from "../../api/fixturesAPI";

const PublishWeekModal = ({
	seasonId,
	weekId,
	season,
	week,
}: {
	weekId: number;
	seasonId: number;
	season: string;
	week: number;
}) => {
	const dispatch = useAppDispatch();

	const isPubshingWeek = useAppSelector(selectIsPublishingWeek);
	const showPublishWeekModal = useAppSelector(selectShowPublishWeekModal);

	const publishWeek = async () => {
		dispatch(
			publishWeekAPI({
				seasonId,
				weekId,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowPublishWeekModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to publish{" "}
						<span className="font-medium">week {week}</span> in{" "}
						<span className="font-medium">{season}</span>. Are you really sure
						about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Publish Week"
						onClick={publishWeek}
						loading={isPubshingWeek}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowPublishWeekModal(false))}
					/>
				</div>
			}
			isOpen={showPublishWeekModal}
			title="Publish Week"
		/>
	);
};

export default PublishWeekModal;
