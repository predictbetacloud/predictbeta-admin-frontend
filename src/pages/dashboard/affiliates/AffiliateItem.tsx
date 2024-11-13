import { useEffect, useMemo } from "react";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import queryString from "query-string";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { FaChevronLeft } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import PageLoading from "../../../components/loaders/PageLoading";

import { getSpecificInfluencerAPI } from "../../../api/affiliatesAPI";

import {
  selectIsFetchingSpecificInfluencer,
  selectSpecificInfluencer,
  selectShowDeleteInfluencerModal,
  setShowDeleteInfluencerModal,
} from "../../../state/slices/affiliates";
import DeleteInfluencerModal from "../../../components/modals/DeleteInfluencerModal";

const AffiliateItem = () => {
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const page = queries?.page;

  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();

  const specificInfluencer = useAppSelector(selectSpecificInfluencer);
   const showDeleteInfluencerModal = useAppSelector(
     selectShowDeleteInfluencerModal
   );

  const isFetchingInfluencer = useAppSelector(
    selectIsFetchingSpecificInfluencer
  );

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!page) {
      setSearchParams({
        page: String(1),
      });
    }
  });

  useMemo(() => {
    dispatch(getSpecificInfluencerAPI({ userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout title="Affiliates">
      {isFetchingInfluencer ? (
        <PageLoading />
      ) : (
        <>
          <section className="w-full px-8 pt-8 flex items-center justify-between">
            <Button.Outline
              title=""
              onClick={() => navigate("/dashboard/affiliates")}
              content={
                <div className="flex items-center space-x-1 text-[#EB1536]">
                  <FaChevronLeft />
                  <p className="text-sm ">Back</p>
                </div>
              }
            />
            <Button.Outline
              className="border !px-10 hover:bg-[#0D5B88]/20 border-[#0D5B88]"
              title=""
              content={
                <div className="flex items-center space-x-1 text-[#0D5B88]">
                  <p className="text-sm ">Send Email</p>
                </div>
              }
            />
          </section>

          <section className="w-full p-8 space-y-4 ">
            <h2 className="text-xl font-semibold mb-4">Affiliate Details</h2>
            <div className="w-fit border-2 border-[#F4F5F8] p-6 rounded-md">
              <div className="p-3">
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div className="text-[#808080] ">First Name</div>
                  <div>Omalay</div>

                  <div className="text-[#808080]">Last Name</div>
                  <div>Odogwu</div>

                  <div className="text-[#808080]">Username</div>
                  <div>Omalay001</div>

                  <div className="text-[#808080]">Phone Number</div>
                  <div>+234 80662205304</div>

                  <div className="text-[#808080]">Email Address</div>
                  <div>omalayodogwu1@gmail.com</div>

                  <div className="text-[#808080]">Referral Link</div>
                  <div>
                    <a
                      href="http://predict9ja.com/affiliate/p/5YBF-T7UK"
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      http://predict9ja.com/affiliate/p/5YBF-T7UK
                    </a>
                  </div>

                  <div className="text-[#808080]">No of Referrals</div>
                  <div>250 users</div>
                </div>
              </div>
            </div>
            <Button.Outline
              title=""
              className="!bg-[#EB1536] "
              onClick={() => dispatch(setShowDeleteInfluencerModal(true))}
              content={
                <div className="flex items-center space-x-1 text-white">
                  <p className="text-sm ">Remove Affiliate</p>
                </div>
              }
            />
          </section>

          {showDeleteInfluencerModal ? (
            <DeleteInfluencerModal user={specificInfluencer?.user} />
          ) : null}
        </>
      )}
    </DashboardLayout>
  );
};

export default AffiliateItem;
