import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import {
	selectIsDeletingUser,
	selectShowDeleteUserModal,
	setShowDeleteUserModal,
} from "../../state/slices/users";
import { useParams } from "react-router-dom";
import { IUser } from "../../types/types";
import { deletetUserAPI } from "../../api/usersAPI";

const DeleteUserModal = ({ user }: { user: IUser | undefined }) => {
	const dispatch = useAppDispatch();
	const { userId } = useParams();

	const isDeletingUser = useAppSelector(selectIsDeletingUser);
	const showDeleteUserModal = useAppSelector(selectShowDeleteUserModal);

	const deleteUser = async () => {
		dispatch(
			deletetUserAPI({
				userId,
			})
		);
	};

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowDeleteUserModal(false));
			}}
			content={
				<div>
					<p className="text-[#6D7786] mt-6 text-sm">
						You are about to delete{" "}
						<span className="font-medium">
							{user?.firstName} {user?.surname}
						</span>
						. Are you really sure about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						type="button"
						title="Delete user"
						onClick={deleteUser}
						loading={isDeletingUser}
					/>
					<Button.Outline
						className="w-full mt-4"
						type="button"
						title="Cancel"
						onClick={() => dispatch(setShowDeleteUserModal(false))}
					/>
				</div>
			}
			isOpen={showDeleteUserModal}
			title="Delete User"
		/>
	);
};

export default DeleteUserModal;
