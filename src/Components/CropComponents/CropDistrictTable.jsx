import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom";
// import { CurtainsRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";

const headCells = [
  {
    id: "id",
    label: "S.No",
  },

  {
    id: "districtCount",
    label: "District",
  },
  {
    id: "fpoCount",
    label: "FPOs",
  },
  {
    id: "area",
    label: "Area (Ha)",
  },
  {
    id: "farmerCount",
    label: "Farmer",
  },
  {
    id: "Production (MT) ",
    label: "Production (MT) ",
  },
];

export default function CropDistrictTable({ data, handleClickCrop, loading }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter data based on search input
    const filtered = data.filter((item) =>
      item?.DistrictName?.toLowerCase()?.includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setPageIndex(0); // Reset page index when search changes
  }, [search, data]);

  const handlePageChange = (event, value) => {
    setPageIndex(value - 1);
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);
  //   let head = Object.keys(data);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    whiteSpace: "nowrap",
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    // borderBottom: "1px solid rgba(224, 224, 224, 1)", // Adds vertical divider
    [theme.breakpoints.down("sm")]: {
      padding: "4px", // Adjust padding for smaller screens
      fontSize: "0.8rem", // Adjust font size for smaller screens
    },
  }));

  const StyledTableContainer = styled(TableContainer)({
    borderRadius: 12,

    width: "100%",
    minHeight: { xs: "300px", md: "400px", lg: "628px" },
    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
    overflowX: "auto", // Enable horizontal scrolling if needed
  });
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(even)": {
      backgroundColor: "#BEFCE8",
    },
  });

  // const navigate = useNavigate();

  const calculateTotals = (data) => {
    return data.reduce(
      (totals, row) => {
        const parseNumber = (value) => Number(value?.replace(/,/g, ""));
        totals.fpoCount += parseNumber(row.fpoCount);
        totals.landArea += parseNumber(row.landArea);
        totals.FarmerCount += parseNumber(row.FarmerCount);
        totals.TotalProduction += parseNumber(row.TotalProduction);
        for (let key in totals) {
          totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
        }

        return totals;
      },
      {
        fpoCount: 0,
        landArea: 0,
        FarmerCount: 0,
        TotalProduction: 0,
      }
    );
  };

  const totals = calculateTotals(filteredData);
  const renderSkeletonRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={index}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
            <Skeleton variant="text" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };
  const renderPlaceholderRows = (numRows) => {
    return Array.from({ length: numRows }).map((_, index) => (
      <StyledTableRow key={`placeholder-${index}`}>
        {headCells.map((headCell) => (
          <StyledTableCell key={headCell.id} align="center">
            &nbsp;
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ));
  };
  return (
    <>
      <Card
        style={{
          borderRadius: "12px",
          minHeight: "auto",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <TableRow>
                <StyledTableCell style={{ color: "white" }} align="center">
                  S.No
                </StyledTableCell>

                <StyledTableCell style={{ color: "white" }} align="center">
                  District
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  FPOs
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  Area (Ha)
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  Farmer
                </StyledTableCell>
                <StyledTableCell style={{ color: "white" }} align="center">
                  Production (MT)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    return (
                      <StyledTableRow key={ind}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.DistrictName}
                        </StyledTableCell>

                        <StyledTableCell
                          style={{
                            color: row.fpoCount === "0" ? "#808080" : "blue",
                            textDecoration:
                              row.fpoCount === "0" ? "none" : "underline",
                            cursor:
                              row.fpoCount === "0" ? "default" : "pointer",
                          }}
                          onClick={() =>
                            row.fpoCount !== "0" && handleClickCrop(row)
                          }
                          align="center"
                        >
                          {row.fpoCount}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.landArea || 0}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.FarmerCount}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.TotalProduction || 0}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <StyledTableCell
                    colSpan={headCells.length}
                    align="center"
                    className="colorCodeTable"
                    style={{ height: "500px" }}
                  >
                    No data available
                  </StyledTableCell>
                </TableRow>
              )}
              {!loading &&
                filteredData.length > 0 &&
                renderPlaceholderRows(
                  Math.max(
                    0,
                    pageSize -
                      filteredData.slice(
                        pageIndex * pageSize,
                        (pageIndex + 1) * pageSize
                      ).length
                  )
                )}
              {!loading && filteredData.length > 0 && (
                <StyledTableRow key={"totals-dist"}>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                    component="th"
                    scope="row"
                    // colSpan={2}
                  >
                    Total
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="colorCodeTable"
                  ></StyledTableCell>

                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.fpoCount || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.landArea || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.FarmerCount || 0}
                  </StyledTableCell>
                  <StyledTableCell align="center" className="colorCodeTable">
                    {totals.TotalProduction || 0}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={0.5}
          mb={0.5}
        >
          <Grid item ml={2}>
            <Typography variant="caption">
              Showing {entriesStart} - {entriesEnd} of {filteredData.length}{" "}
              entries
            </Typography>
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(filteredData.length / pageSize)}
              page={pageIndex + 1}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Box>
      </Card>
    </>
  );
}