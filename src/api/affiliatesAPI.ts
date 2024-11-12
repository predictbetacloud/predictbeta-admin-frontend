import { createAsyncThunk } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../connection/defaultClient";
import { toastError, toastSuccess } from "../utils/toast";
import {
  setInfluencers,
  setIsFetchingAllInfluencers,
  setSpecificInfluencer,
  setIsFetchingSpecificInfluencer,
  setIsCreatingInfluencer,
  setIsDeletingInfluencer,
  setShowAddInfluencerModal,
  setShowDeleteInfluencerModal,
  // setShowSendEmailModal,
} from "../state/slices/affiliates";
import { globalRouter } from "../utils/utils";
import { createCancelableThunk } from "./helper";

export const createAffiliateAPI = createAsyncThunk(
  "influencers/create",
  (
    { firstName, surname, email }: FieldValues,
    { dispatch }
  ) => {
    dispatch(setIsCreatingInfluencer(true));

    axiosInstance
      .post(`/influencers`, {
        firstName,
        lastName: surname,
        email,
      })
      .then((data) => {
        dispatch(setIsCreatingInfluencer(false));
        dispatch(getAllInfluencersAPI({}));
        dispatch(setShowAddInfluencerModal(false));
        toastSuccess(data?.data?.message ?? "Affiliate added successfully");
        // if (globalRouter.navigate) {
        // 	globalRouter.navigate("/dashboard/influencers");
        // }
      })
      .catch((error) => {
        dispatch(setIsCreatingInfluencer(false));
        toastError(error?.response?.data?.message);
        console.error(error);
      });
  }
);

export const getAllInfluencersAPI = createCancelableThunk(
  "influencers/getAllInfluencers",
  "getAllInfluencers",
  () => `/influencers`,
  setIsFetchingAllInfluencers,
  setInfluencers
);

export const getSpecificInfluencerAPI = createCancelableThunk(
  "influencers/getSpecific",
  "getSpecific",
  ({ userId }) => `/influencers/${userId}`,
  setIsFetchingSpecificInfluencer,
  setSpecificInfluencer
);

export const deletetInfluencerAPI = createAsyncThunk(
  "influencers/deleteUser",
  ({ userId }: FieldValues, { dispatch }) => {
    dispatch(setIsDeletingInfluencer(true));

    axiosInstance
      .delete(`/influencers/${userId}`)
      .then((data) => {
        dispatch(setIsDeletingInfluencer(false));
        dispatch(setShowDeleteInfluencerModal(false));
        if (globalRouter.navigate) {
          globalRouter.navigate("/dashboard/affiliates");
        }
        toastSuccess(data?.data?.message ?? "Affiliate deleted successfully");
      })
      .catch((error) => {
        dispatch(setIsDeletingInfluencer(false));
        toastError(error?.response?.data?.message);
        console.error(error);
      });
  }
);