import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import {
	selectIsBlockingUser,
	selectShowBlockUserModal,
	setShowBlockUserModal,
} from "../../state/slices/users";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/types";
import { blockUserAPI } from "../../api/usersAPI";

const BlockUserModal = ({ user }: { user: IUser | undefined }) => {
	const dispatch = useAppDispatch();
	const { userId } = useParams();

	const isBlockingUser = useAppSelector(selectIsBlockingUser);
	const showBlockUserModal = useAppSelector(selectShowBlockUserModal);

	const blockUser = async () => {
		dispatch(
			blockUserAPI({
				userId,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowBlockUserModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to block{" "}
						<span className="font-medium">
							{user?.firstName} {user?.surname}
						</span>
						. Are you really sure about this?
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Block user"
						onClick={blockUser}
						loading={isBlockingUser}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowBlockUserModal(false))}
					/>
				</div>
			}
			isOpen={showBlockUserModal}
			title="Block User"
		/>
	);
};

export default BlockUserModal;
