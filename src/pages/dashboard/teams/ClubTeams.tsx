import { useState, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import * as dfn from "date-fns";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import TabNav from "../../../components/layout/TabNav";
import { P } from "../../../components/Texts";
import Table from "../../../components/Table";

import {
  selectAllClubTeams,
  selectIsFetchingTeams,
} from "../../../state/slices/teams";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { getAllClubTeamsAPI } from "../../../api/teamsAPI";
import { IClub } from "../../../types/types";
import { Input } from "../../../components/inputs/Input";

const ClubTeams = () => {
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const page = queries?.page;

  const club = useAppSelector(selectAllClubTeams);
  const isFetchingClubs = useAppSelector(selectIsFetchingTeams);
  const dispatch = useAppDispatch();

  const [, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>("");

  useMemo(
    () =>
      dispatch(
        getAllClubTeamsAPI({
          params: {
            limit: 10,
            page,
          },
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  useEffect(() => {
    if (!page) {
      setSearchParams({
        page: String(1),
      });
    }
  }, [page, setSearchParams]);

  const filteredClubs = useMemo(() => {
    if (!club?.items || !searchTerm) return club?.items ?? [];
    return club.items.filter((item: IClub) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [club?.items, searchTerm]);

  const columns = useMemo<ColumnDef<IClub>[]>(
    () => [
      {
        header: "CLUB NAME",
        accessorKey: "name",
        cell: (info) => {
          const clubName = info.getValue();

          return (
            <div className="flex items-center space-x-4">
              <img
                src={info.row.original.clubLogo}
                alt={String(clubName)}
                className="w-8 h-8"
              />
              <span>{String(clubName)}</span>
            </div>
          );
        },
      },
      {
        header: "ABBREV.",
        accessorKey: "shortName",
        cell: (info) => info.getValue(),
      },
      {
        header: "DATE ADDED",
        accessorKey: "createdAt",
        cell: (info) => {
          // Assuming info.getValue() returns a date string or a Date object
          const dateValue = info.getValue<Date | string>();

          // If dateValue is a string, convert it to a Date object
          const date =
            typeof dateValue === "string" ? new Date(dateValue) : dateValue;

          // Check if date is a valid Date object
          if (date instanceof Date && !isNaN(date.getTime())) {
            return dfn.format(date, "MMM d, yyyy");
          } else {
            return "Invalid Date";
          }
        },
      },
      {
        header: "PLAYERS",
        accessorKey: "players",
        cell: (info) => {
          const players = info.getValue<[]>();
          if (Array.isArray(players) && players.length) {
            return players.length;
          } else {
            return 0;
          }
        },
      },
      {
        header: "ACTION",
        accessorKey: "id",
        cell: (info) => {
          const teamID = info.getValue();

          return (
            <div className="flex space-x-2">
              <Link to={`/dashboard/teams/edit/${teamID}`}>
                <Button.Outline title="Edit team" />
              </Link>
              <Link to={`/dashboard/teams/view/${teamID}`}>
                <Button.Outline title="Manage players" />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <DashboardLayout title="Team management">
      <section className="predictbeta-header w-full px-8  flex items-center justify-between">
        <div className="pt-8">
          <TabNav
            tabs={[
              { path: "/dashboard/teams", title: "Club sides" },
              { path: "/dashboard/teams/country", title: "Country sides" },
            ]}
          />
        </div>

        <div className="w-[40%] ">
          <Input
            type="text"
            placeholder="Search clubs..."
            className="input w-full "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link to="/dashboard/teams/new-club">
          <Button
            title=""
            content={
              <P className="flex items-center gap-x-2">
                <FaPlus size={12} />
                New team
              </P>
            }
          />
        </Link>
      </section>
      <section className="w-full p-8">
        <Table
          data={filteredClubs}
          columns={columns}
          rows={10}
          loading={isFetchingClubs}
          totalPages={club?.meta?.totalPages ?? 1}
          current_page={Number(page ?? 1)}
          setCurrentPage={(page: number): void => {
            setSearchParams({
              page: String(page),
            });
          }}
        />
      </section>
    </DashboardLayout>
  );
};

export default ClubTeams;
