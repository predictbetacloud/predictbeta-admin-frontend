import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import {
	selectIsUnblockingUser,
	selectShowUnblockUserModal,
	setShowUnblockUserModal,
} from "../../state/slices/users";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/types";
import { unblockUserAPI } from "../../api/usersAPI";

const UnblockUserModal = ({ user }: { user: IUser | undefined }) => {
	const dispatch = useAppDispatch();
	const { userId } = useParams();

	const isUnblockingUser = useAppSelector(selectIsUnblockingUser);
	const showUnblockUserModal = useAppSelector(selectShowUnblockUserModal);

	const unblockUser = async () => {
		dispatch(
			unblockUserAPI({
				userId,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowUnblockUserModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to unblock{" "}
						<span className="font-medium">
							{user?.firstName} {user?.surname}
						</span>
						. Are you really sure about this?
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Unblock user"
						onClick={unblockUser}
						loading={isUnblockingUser}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowUnblockUserModal(false))}
					/>
				</div>
			}
			isOpen={showUnblockUserModal}
			title="Unblock User"
		/>
	);
};

export default UnblockUserModal;
