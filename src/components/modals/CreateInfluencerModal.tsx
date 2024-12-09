import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";

import {
  selectIsCreatingInfluencer,
  selectShowAddInfluencerModal,
  setShowAddInfluencerModal,
} from "../../state/slices/affiliates";
import { createAffiliateAPI } from "../../api/affiliatesAPI";

const CreateInfluencerModal = () => {
  const dispatch = useAppDispatch();

  const isCreatingInfluencer = useAppSelector(selectIsCreatingInfluencer);
  const showAddInfluencerModal = useAppSelector(selectShowAddInfluencerModal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addInfluencer = async ({
    firstName,
    lastName,
    // userName,
    email,
  }: FieldValues) => {
    dispatch(
      createAffiliateAPI({
        firstName,
        surname: lastName,
        // userName,
        email,
      })
    );
  };

  return (
    <Modal
      closeModal={() => {
        dispatch(setShowAddInfluencerModal(false));
        reset();
      }}
      content={
        <form onSubmit={handleSubmit(addInfluencer)}>
          <div className="flex items-center gap-3 justify-between">
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

export default CreateInfluencerModal;
