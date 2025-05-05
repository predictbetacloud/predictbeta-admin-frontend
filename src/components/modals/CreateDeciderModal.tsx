import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";
import { P } from "../Texts";
import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import {
  selectIsCreatingDeciders,
  selectShowCreateDecidersModal,
  setShowCreateDecidersModal,
} from "../../state/slices/fixtures";
import { createDecidersAPI } from "../../api/fixturesAPI";

const CreateDecidersModal = ({ weekId }: { weekId?: string }) => {
  const dispatch = useAppDispatch();
  useParams();
  //   const { week } = useParams();

  const isCreatingDeciders = useAppSelector(selectIsCreatingDeciders);
  const showCreateDecidersModal = useAppSelector(selectShowCreateDecidersModal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createDeciders = async ({ name }: FieldValues) => {
    console.log("Form Submitted with:", { name, weekId });

    dispatch(
      createDecidersAPI({
        question: name,
        weekId,
      })
    );
  };

  return (
    <Modal
      closeModal={() => {
        dispatch(setShowCreateDecidersModal(false));
        reset();
      }}
      content={
        <form onSubmit={handleSubmit(createDeciders)}>
          {/* Deciders Name */}
          <div className="">
            <label htmlFor="name" className="mb-2 block">
              <P className="text-[#222222] text-sm">Question</P>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Will Drogba score on his chelsea debut?"
              {...register("name", {
                required: "Deciders is required",
              })}
              className={`w-full input ${errors?.name ? "invalid" : ""}`}
            />
            {errors?.name && (
              <ErrorMessage
                message={errors?.name && errors?.name.message?.toString()}
              />
            )}
          </div>

          <Button
            className="w-full mt-6"
            type="submit"
            title="Save"
            loading={isCreatingDeciders}
          />
        </form>
      }
      isOpen={showCreateDecidersModal}
      title="Create Deciders"
    />
  );
};

export default CreateDecidersModal;
