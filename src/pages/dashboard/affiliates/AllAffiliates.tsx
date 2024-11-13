import React, { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";
import * as _ from "lodash";
import noAffiliate from "../../../assets/images/no-affiliate.png";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { P } from "../../../components/Texts";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { IUser } from "../../../types/types";
import {
  selectAllInfluencers,
  selectIsFetchingAllInfluencers,
  selectShowAddInfluencerModal,
  selectShowDeleteInfluencerModal,
  selectSpecificInfluencer,
  setShowAddInfluencerModal,
  setShowDeleteInfluencerModal,
} from "../../../state/slices/affiliates";
import { getAllInfluencersAPI } from "../../../api/affiliatesAPI";
import { Input } from "../../../components/inputs/Input";
import CreateInfluencerModal from "../../../components/modals/CreateInfluencerModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import DeleteInfluencerModal from "../../../components/modals/DeleteInfluencerModal";

const AllAffiliates = () => {
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const page = queries?.page;
  const [searchParams, setSearchParams] = useSearchParams();
  // const search = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const allInfluencers = useAppSelector(selectAllInfluencers);
  const specificInfluencer = useAppSelector(selectSpecificInfluencer);
  const showAddInfluencerModal = useAppSelector(selectShowAddInfluencerModal);
  const showDeleteInfluencerModal = useAppSelector(
    selectShowDeleteInfluencerModal
  );
  const isFetchingInfluencers = useAppSelector(selectIsFetchingAllInfluencers);
  const dispatch = useAppDispatch();

  useMemo(
    () =>
      dispatch(
        getAllInfluencersAPI({
          params: {
            limit: 10,
            page,
            searchQuery,
            // ...params,
          },
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, searchQuery]
  );

  useEffect(() => {
    if (!page) {
      setSearchParams({
        page: String(1),
        search: searchQuery,
      });
    }
  }, [page, searchQuery, setSearchParams]);

  const debouncedSearch = _.debounce((search) => {
    setSearchParams({
      search,
      page: String(1),
    });
    setSearchQuery(search);
  }, 1000);

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event?.currentTarget?.value;
    debouncedSearch(value);
  };

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: "FULL NAME",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        header: "USERNAME",
        accessorKey: "username",
        cell: (info) => info.getValue() || "null",
      },
      {
        header: "EMAIL ADDRESS",
        accessorKey: "email",
        cell: (info) => info.getValue(),
      },
      {
        header: "REFERRAL COUNT",
        accessorKey: "userId",
        cell: (info) => info.getValue() || "null",
      },
      {
        header: "REFERRAL LINK",
        accessorKey: "code",
        cell: (info) => info.getValue(),
      },
      {
        header: "ACTION",
        accessorKey: "id",
        cell: (info) => {
          const userID = info.getValue();
          console.log(userID);
          return (
            <div className="flex space-x-2">
              <Menu>
                <MenuButton className="">
                  <Button.Outline title="" content={<FiMoreHorizontal />} />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="bg-white text-[#5F6B7A] w-52 origin-top-right !border-0 rounded-[6px] p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-0 !ring-2 !ring-gray-200 !outline-0 data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <Link
                      to={`/dashboard/affiliates/view/${userID}`}
                      className="group hover:bg-gray-100 hover:text-gray-800 flex w-full items-center gap-2 rounded-[6px] py-1.5 px-3"
                    >
                      View Details
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button className="group hover:bg-gray-100 hover:text-gray-800 flex w-full items-center gap-2 rounded-[6px] py-1.5 px-3">
                      Send Email
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() =>
                        dispatch(setShowDeleteInfluencerModal(true))
                      }
                      className="group text-[#EB1536] hover:bg-gray-100 flex w-full items-center gap-2 rounded-[6px] py-1.5 px-3"
                    >
                      Remove Affiliate
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Affiliates">
      <section className="predictbeta-header w-full px-8 py-4  flex items-center justify-between">
        <div className="">
          <Input
            id="search"
            type="text"
            placeholder="Search by username"
            onChange={handleSearch}
            defaultValue={searchQuery}
            className={`w-96 input`}
          />
        </div>
        <Button
          title=""
          onClick={() => dispatch(setShowAddInfluencerModal(true))}
          content={
            <P className="flex items-center gap-x-2">
              <FaPlus size={12} />
              Add Affiliate
            </P>
          }
        />
      </section>
      <section className="w-full p-8 overscroll-y-auto ">
        {allInfluencers?.items && allInfluencers.items.length > 0 ? (
          <Table
            data={allInfluencers.items}
            columns={columns}
            rows={10}
            loading={isFetchingInfluencers}
            totalPages={allInfluencers?.meta.totalPages ?? 1}
            current_page={Number(page ?? 1)}
            empty_message="No results"
            setCurrentPage={(page: number): void => {
              setSearchParams({
                page: String(page),
                search: searchQuery,
              });
            }}
          />
        ) : (
          <div className="flex flex-col justify-center items-center h-96">
            <img
              src={noAffiliate}
              alt="No Affiliate Found"
              className="w-[320px] h-auto"
            />
            <div className="flex text-center flex-col text-[#4F4F4F] ">
              <h2 className="font-medium text-[24px]">No Affiliate Yet</h2>
              <P className="text-[#4F4F4F] text-[14px] font-normal ">
                Affiliates will appear here when they are been added
              </P>
            </div>
          </div>
        )}
      </section>

      {showAddInfluencerModal ? <CreateInfluencerModal /> : null}
      {showDeleteInfluencerModal ? (
        <DeleteInfluencerModal user={specificInfluencer?.user} />
      ) : null}
    </DashboardLayout>
  );
};

export default AllAffiliates;
