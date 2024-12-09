import { IUser } from "./types";

export interface InfluencerState {
  influencers: IPaginatedInfluencers | null;
  specificInfluencer: IUser | null;
  isCreatingInfluencer: boolean;
  isDeletingInfluencer: boolean;
  isFetchingAllInfluencers: boolean;
  isFetchingSpecificInfluencer: boolean;
  showAddInfluencerModal: boolean;
  showDeleteInfluencerModal: boolean;
  showSendEmailModal: boolean;
}

export interface IPaginatedInfluencers {
  items: IUser[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
