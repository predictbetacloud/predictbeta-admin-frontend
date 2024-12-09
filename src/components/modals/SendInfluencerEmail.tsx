import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
// import { useParams } from "react-router-dom";
import {
  selectIsCreatingInfluencer,
  selectShowAddInfluencerModal,
  // setShowAddInfluencerModal,
  setShowSendInfluencerEmailModal,
} from "../../state/slices/affiliates";
// import { createAffiliateAPI } from "../../api/affiliatesAPI";
import { IUser } from "../../types/types";

const SendInfluencerEmail = ({ user }: { user: IUser | undefined }) => {
  const dispatch = useAppDispatch();
  // const { userId } = useParams();

  // const isSendingInfluencerEmail = useAppSelector(selectIsCreatingInfluencer);

  const isCreatingInfluencer = useAppSelector(selectIsCreatingInfluencer);
  const showAddInfluencerModal = useAppSelector(selectShowAddInfluencerModal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const emailInfluencer = ({ data }: FieldValues) => {
    console.log(data);
  };

  // const emailInfluencer = async ({
  //   subject,
  //   message,

  // }: FieldValues) => {
  //   dispatch(
  //     emailAffiliateAPI({
  //       subject,
  //       message
  //     })
  //   );
  // };

  return (
    <Modal
      closeModal={() => {
        dispatch(setShowSendInfluencerEmailModal(false));
        reset();
      }}
      content={
        <form onSubmit={handleSubmit(emailInfluencer)}>
          <div className="flex items-center gap-3 justify-between">
            {/* First Name */}
            <div className="">
              <label htmlFor="firstName" className="mb-2 block">
                <p className="text-[#222222] text-sm">
                  First {user?.firstName} {user?.surname}{" "}
                </p>
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
            <div className="mt5">
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
          </div>
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
              placeholder="Enter email address"
              className={`w-full input ${errors?.email ? "invalid" : ""}`}
            />
            {errors?.email && (
              <ErrorMessage message={errors.email.message?.toString()} />
            )}
          </div>

          <Button
            className="w-full mt-6"
            type="submit"
            title="Add Affiliate"
            loading={isCreatingInfluencer}
          />
        </form>
      }
      isOpen={showAddInfluencerModal}
      title="Create Affiliate"
    />
  );
};

export default SendInfluencerEmail;
