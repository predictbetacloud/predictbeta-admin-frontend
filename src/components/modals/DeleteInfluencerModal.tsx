import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import Button from "../Buttons";
import {
  selectIsDeletingInfluencer,
  selectShowDeleteInfluencerModal,
  setShowDeleteInfluencerModal,
} from "../../state/slices/affiliates";

import { IAffiliate } from "../../types/types";
import { deletetInfluencerAPI } from "../../api/affiliatesAPI";

const DeleteInfluencerModal = ({ user }: { user: IAffiliate | undefined }) => {
  const dispatch = useAppDispatch();


  const isDeletingInfluencer = useAppSelector(selectIsDeletingInfluencer);
  const showDeleteInfluencerModal = useAppSelector(
    selectShowDeleteInfluencerModal
  );
  const deleteInfluencer = async () => {
    dispatch(
      deletetInfluencerAPI({
        id: user?.id,
      })
    );
  };


  return (
    <Modal
      closeModal={() => {
        dispatch(setShowDeleteInfluencerModal(false));
      }}
      content={
        <div>
          <p className="text-[#6D7786] mt-6 text-sm">
            You are about to delete{" "}
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            . Are you really sure about this? This action cannot be undone.
          </p>
          <Button
            className="w-full mt-6"
            type="button"
            title="Remove Affiliate"
            onClick={deleteInfluencer}
            loading={isDeletingInfluencer}
          />
          <Button.Outline
            className="w-full mt-4"
            type="button"
            title="Cancel"
            onClick={() => dispatch(setShowDeleteInfluencerModal(false))}
          />
        </div>
      }
      isOpen={showDeleteInfluencerModal}
      title="Remove Affiliate"
    />
  );
};

export default DeleteInfluencerModal;
