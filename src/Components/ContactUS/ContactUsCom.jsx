// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/system";
// import {
//   Box,
//   Grid,
//   Card,
//   Skeleton,
//   Typography,
//   Pagination,
// } from "@mui/material";
// const headCells = [
//   { id: "id", label: "S.No" },
//   { id: "State", label: "State" },
//   { id: "SLA", label: "SLA" },
//   { id: "Concerned person", label: "Concerned person" },
//   { id: "Designation", label: "Designation" },
//   { id: "Email id", label: "Email id" },
// ];
// export default function ContactUsCom({ data, loading }) {
//   const [search, setSearch] = useState("");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     if (data?.length) {
//       const filtered = data.filter((item) =>
//         item.state?.toLowerCase()?.includes(search?.toLowerCase())
//       );
//       setFilteredData(filtered);
//       setPageIndex(0);
//     }
//   }, [search, data]);

//   const handlePageChange = (event, value) => {
//     setPageIndex(value - 1);
//   };

//   const entriesStart = pageIndex * pageSize + 1;
//   const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     borderBottom: 0,
//     whiteSpace: "nowrap",
//     minHeight: { xs: "400px", md: "400px", lg: "500px" },
//     borderRight: "1px solid rgba(224, 224, 224, 1)",
//     [theme.breakpoints.down("sm")]: {
//       padding: "4px",
//       fontSize: "0.8rem",
//     },
//   }));

//   const StyledTableContainer = styled(TableContainer)({
//     borderRadius: 12,
//     width: "100%",
//     minHeight: { xs: "300px", md: "400px", lg: "628px" },
//     boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.15)",
//     overflowX: "auto", // Enable horizontal scrolling if needed
//   });
//   const StyledTableRow = styled(TableRow)({
//     "&:nth-of-type(even)": {
//       backgroundColor: "#BEFCE8",
//     },
//   });
//   const calculateTotals = (data) => {
//     return data.reduce(
//       (totals, row) => {
//         const parseNumber = (value) => Number(value?.replace(/,/g, ""));
//         totals.stateCount += parseNumber(row.stateCount);
//         totals.districtCount += parseNumber(row.districtCount);
//         totals.fpoCount += parseNumber(row.fpoCount);
//         totals.figCount += parseNumber(row.figCount);
//         totals.landArea += parseNumber(row.landArea);
//         totals.farmerCount += parseNumber(row.farmerCount);
//         for (let key in totals) {
//           totals[key] = Math.round((totals[key] + Number.EPSILON) * 100) / 100;
//         }
//         return totals;
//       },
//       {
//         stateCount: 0,
//         districtCount: 0,
//         fpoCount: 0,
//         figCount: 0,
//         landArea: 0,
//         farmerCount: 0,
//       }
//     );
//   };

//   const totals = calculateTotals(filteredData);
//   const renderSkeletonRows = (numRows) => {
//     return Array.from({ length: numRows }).map((_, index) => (
//       <StyledTableRow key={index}>
//         {headCells.map((headCell) => (
//           <StyledTableCell key={headCell.id} align="center">
//             <Skeleton variant="text" />
//           </StyledTableCell>
//         ))}
//       </StyledTableRow>
//     ));
//   };

//   const renderPlaceholderRows = (numRows) => {
//     return Array.from({ length: numRows }).map((_, index) => (
//       <StyledTableRow key={`placeholder-${index}`}>
//         {headCells.map((headCell) => (
//           <StyledTableCell key={headCell.id} align="center">
//             &nbsp;
//           </StyledTableCell>
//         ))}
//       </StyledTableRow>
//     ));
//   };

//   return (
//     <>
//       <Card
//         style={{
//           borderRadius: "12px",
//         }}
//         elevation={6}
//       >
//         <StyledTableContainer component={Paper}>
//           <Table aria-label="simple table" size={"medium"}>
//             <TableHead style={{ backgroundColor: "#43C17A" }}>
//               <TableRow>
//                 {headCells.map((headCell, index) => (
//                   <StyledTableCell
//                     key={index}
//                     style={{ color: "white" }}
//                     align="center"
//                   >
//                     {headCell.label}
//                   </StyledTableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 renderSkeletonRows(10)
//               ) : filteredData.length > 0 ? (
//                 filteredData
//                   .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
//                   .map((row, ind) => {
//                     const isEvenRow = ind % 2 === 1;
//                     return (
//                       <StyledTableRow
//                         key={ind}
//                         sx={{
//                           backgroundColor: isEvenRow
//                             ? "#BEFCE8 "
//                             : "transparent",
//                         }}
//                       >
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {pageIndex * 10 + ind + 1}
//                         </StyledTableCell>
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {row.state}
//                         </StyledTableCell>
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {row.sla}
//                         </StyledTableCell>
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {row.concernedPerson}
//                         </StyledTableCell>
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {row.designation}
//                         </StyledTableCell>
//                         <StyledTableCell
//                           align="center"
//                           className="colorCodeTable"
//                         >
//                           {row.email}
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     );
//                   })
//               ) : (
//                 <TableRow>
//                   <StyledTableCell
//                     style={{
//                       height: "571px",
//                     }}
//                     colSpan={headCells.length}
//                     align="center"
//                   >
//                     No data available
//                   </StyledTableCell>
//                 </TableRow>
//               )}
//               {!loading &&
//                 filteredData.length < pageSize &&
//                 filteredData.length > 0 &&
//                 renderPlaceholderRows(
//                   Math.max(
//                     0,
//                     pageSize -
//                       filteredData.slice(
//                         pageIndex * pageSize,
//                         (pageIndex + 1) * pageSize
//                       ).length
//                   )
//                 )}
//             </TableBody>
//           </Table>
//         </StyledTableContainer>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mt={0.5}
//           mb={0.5}
//         >
//           <Grid item ml={2}>
//             <Typography variant="caption">
//               Showing {entriesStart} - {entriesEnd} of {filteredData.length}{" "}
//               entries
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Pagination
//               count={Math.ceil(filteredData.length / pageSize)}
//               page={pageIndex + 1}
//               onChange={handlePageChange}
//               color="primary"
//             />
//           </Grid>
//         </Box>
//       </Card>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import SecureLS from "secure-ls";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import {
  Box,
  Card,
  Grid,
  Skeleton,
  Pagination,
  Typography,
  IconButton,
} from "@mui/material";
export default function NotificationTable({
  loading,
  data,
  headCells,
  handleEditClick,
  handleDeleteClick,
}) {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const ls = new SecureLS({ encodingType: "aes" });
  const fetchToken = () => {
    let token = null;
    try {
      const data = ls.get("authToken");
      if (typeof data === "string" && data.trim().length > 0) {
        token = JSON.parse(data);
      }
    } catch (error) {
      console.error("Could not parse JSON", error);
      ls.remove("authToken");
    }
    return token;
  };

  const tokenData = fetchToken();
  const userRole = tokenData?.user_role;

  useEffect(() => {
    const filtered = data.filter((item) =>
      item?.state?.toLowerCase()?.includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setPageIndex(0);
  }, [search, data]);

  const handlePageChange = (value) => {
    setPageIndex(value - 1);
  };

  const handleEntriesPerPageChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const entriesStart = pageIndex * pageSize + 1;
  const entriesEnd = Math.min((pageIndex + 1) * pageSize, filteredData.length);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    whiteSpace: "nowrap",
    borderRight: "1px solid rgba(224, 224, 224, 1)", // Adds vertical divider
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
        totals.lrpCount += Number(row.lrpCount) || 0;
        totals.figCount += Number(row.figCount) || 0;
        totals.farmerCount += Number(row.farmerCount) || 0;
        return totals;
      },
      {
        lrpCount: 0,
        farmerCount: 0,
        figCount: 0,
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
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#59c88a";
      case "Pending":
        return "#fabe5e";
      case "Processing":
        return "#feba55";
      case "Rejected":
        return "#f12e00";
      default:
        return "#000000";
    }
  };
  return (
    <React.Fragment>
      <Card
        style={{
          borderRadius: "12px",
        }}
        elevation={6}
      >
        <StyledTableContainer component={Paper}>
          <Table aria-label="simple table" size={"medium"}>
            <TableHead style={{ backgroundColor: "#43C17A" }}>
              <StyledTableRow>
                {headCells.map((headCell, index) => (
                  <StyledTableCell
                    key={headCell.id}
                    style={{
                      color: "white",
                    }}
                    align="center"
                  >
                    {headCell.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeletonRows(10)
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                  .map((row, ind) => {
                    const originalTimestamp = row?.createdAt;
                    const originalDate = new Date(originalTimestamp);
                    const options = {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    };
                    const convertedTimestamp = originalDate?.toLocaleString(
                      "en-GB",
                      options
                    );
                    return (
                      <StyledTableRow key={`fig-table${ind}`}>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {pageIndex * 10 + ind + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable"
                        >
                          {row.state}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ width: "10%" }}
                          className="colorCodeTable"
                        >
                          {row.sla}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.concernedPerson}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.designation}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="colorCodeTable tableRowNumberWidth"
                        >
                          {row.email}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow key={`fig-data${1}`}>
                  <TableCell
                    colSpan={headCells.length}
                    style={{ height: "500px" }}
                    align="center"
                    className="colorCodeTable"
                  >
                    No data available
                  </TableCell>
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
    </React.Fragment>
  );
}