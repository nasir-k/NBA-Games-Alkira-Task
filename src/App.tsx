import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar/NavBar";
import SearchInput from "./components/SearchInput/SearchInput";
import Table from "./components/Table/Table";
import { IRow } from "./components/Table/tableTypes";
import useFetch from "./hooks/useFetch";

function App() {
  const { data: allTeams, isLoading } = useFetch(
    "https://www.balldontlie.io/api/v1/teams?per_page=1000"
  );
  //per_page = 1000 to ensure all data if more than default (30)

  const [filteredTeamsData, setFilteredTeamsData] = useState(allTeams);
  const [userInputValue, setUserInputValue] = useState("");
  const [sort, setSort] = useState<{
    sortBy: string;
    sort: "asc" | "dsc" | "none";
  }>({
    sortBy: "none",
    sort: "none",
  });

  useEffect(() => {
    setFilteredTeamsData(allTeams);
  }, [allTeams]);

  const filterData = (keyword: string) => {
    if (!keyword) {
      setFilteredTeamsData(allTeams);
    } else {
      const filteredTeams = (allTeams as IRow[]).filter((team) => {
        const value = Object.values(team).map((item) =>
          item.toString().toLowerCase().trim()
        );
        return value.findIndex((element) => element.includes(keyword)) >= 0;
      });
      setFilteredTeamsData(filteredTeams);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInputValue = event.target.value.toLowerCase().trim();
    setUserInputValue(userInputValue);
    filterData(userInputValue);
  };

  const changeSort = (sortBy: string, sort: "asc" | "dsc" | "none") => {
    setSort({
      sortBy,
      sort,
    });
  };

  const sortedTeamsData = (filteredTeamsData as any).sort(
    (currentRow: any, nextRow: any) => {
      const { sort: sortOrder, sortBy } = sort;

      if (sortOrder === "asc") {
        if (currentRow[sortBy] < nextRow[sortBy]) {
          return -1;
        } else if (currentRow[sortBy] > nextRow[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      } else if (sortOrder === "dsc") {
        if (currentRow[sortBy] < nextRow[sortBy]) {
          return 1;
        } else if (currentRow[sortBy] > nextRow[sortBy]) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  ) as IRow[];

  return (
    <>
      <NavBar />
      <Container>
        <SearchInput value={userInputValue} onChange={handleInputChange} />
        <Table
          rows={sortedTeamsData}
          sort={sort}
          changeSort={changeSort}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
}

export default App;
