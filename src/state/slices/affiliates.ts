import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../store";
import { IPaginatedInfluencers, InfluencerState } from "../../types/types";

const initialState: InfluencerState = {
  influencers: null,
  isFetchingAllInfluencers: false,
  isFetchingSpecificInfluencer: false,
  specificInfluencer: null,
  isCreatingInfluencer: false,
  isDeletingInfluencer: false,
  showAddInfluencerModal: false,
  showDeleteInfluencerModal: false,
  showSendInfluencerEmailModal: false,
};

export const affiliatesSlice = createSlice({
  name: "influencers",
  initialState,
  reducers: {
    setInfluencers: (state, action: PayloadAction<IPaginatedInfluencers>) => {
      state.influencers = action.payload;
    },
    setIsFetchingAllInfluencers: (
      state,
      action: PayloadAction<InfluencerState["isFetchingAllInfluencers"]>
    ) => {
      state.isFetchingAllInfluencers = action.payload;
    },
    setSpecificInfluencer: (
      state,
      action: PayloadAction<InfluencerState["specificInfluencer"]>
    ) => {
      state.specificInfluencer = action.payload;
    },
    setIsFetchingSpecificInfluencer: (
      state,
      action: PayloadAction<InfluencerState["isFetchingSpecificInfluencer"]>
    ) => {
      state.isFetchingSpecificInfluencer = action.payload;
    },
    setIsCreatingInfluencer: (
      state,
      action: PayloadAction<InfluencerState["isCreatingInfluencer"]>
    ) => {
      state.isCreatingInfluencer = action.payload;
    },
    setIsDeletingInfluencer: (
      state,
      action: PayloadAction<InfluencerState["isDeletingInfluencer"]>
    ) => {
      state.isDeletingInfluencer = action.payload;
    },
    setShowAddInfluencerModal: (
      state,
      action: PayloadAction<InfluencerState["showAddInfluencerModal"]>
    ) => {
      state.showAddInfluencerModal = action.payload;
    },
    setShowDeleteInfluencerModal: (
      state,
      action: PayloadAction<InfluencerState["showDeleteInfluencerModal"]>
    ) => {
      state.showDeleteInfluencerModal = action.payload;
    },
    setShowSendInfluencerEmailModal: (
      state,
      action: PayloadAction<InfluencerState["showSendInfluencerEmailModal"]>
    ) => {
      state.showSendInfluencerEmailModal = action.payload;
    },
  },
});

export const {
  setInfluencers,
  setIsFetchingAllInfluencers,
  setSpecificInfluencer,
  setIsFetchingSpecificInfluencer,
  setIsCreatingInfluencer,
  setIsDeletingInfluencer,
  setShowAddInfluencerModal,
  setShowDeleteInfluencerModal,
  setShowSendInfluencerEmailModal,
} = affiliatesSlice.actions;


export const selectAllInfluencers = (state: RootState) => state.affiliates.influencers;

export const selectSpecificInfluencer = (state: RootState) =>
  state.affiliates.specificInfluencer;

export const selectIsFetchingAllInfluencers = (state: RootState) =>
  state.affiliates.isFetchingAllInfluencers;

export const selectIsFetchingSpecificInfluencer = (state: RootState) =>
  state.affiliates.isFetchingSpecificInfluencer;

export const selectIsCreatingInfluencer = (state: RootState) =>
  state.affiliates.isCreatingInfluencer;

export const selectIsDeletingInfluencer = (state: RootState) =>
  state.affiliates.isDeletingInfluencer;

export const selectShowDeleteInfluencerModal = (state: RootState) =>
  state.affiliates.showDeleteInfluencerModal;

export const selectShowAddInfluencerModal = (state: RootState) =>
  state.affiliates.showAddInfluencerModal;

export const selectShowSendInfluencerEmailModal = (state: RootState) => state.affiliates.showSendInfluencerEmailModal;



