import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { Paper, Box, Button } from "@mui/material";
import { Checkbox } from "@mui/material";

import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { EnhancedTableHead, EnhancedTableToolbar } from "./EnhancedTable";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

var fileDownload = require("js-file-download");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function TestReview(props) {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/worksheet-filter?test=" + test_id.toString())
      .then((res) => {
        setWorkSheets(res.data);
      });

    axios
      .get(
        "http://127.0.0.1:8000/classes-student-teacher-filter?teacher=" +
          props.id.toString()
      )
      .then((res) => {
        setStudents(res.data[0]);
      });
  }, []);

  const downloadWorkSheets = (url) => {
    axios
      .get("http://127.0.0.1:8000" + url, {
        responseType: "blob",
      })
      .then((res) => {
        let config_url = res.config.url.toString();
        fileDownload(res.data, config_url.substring(38, config_url.length));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { test_id } = useParams();
  const [workSheets, setWorkSheets] = useState([]);
  const [students, setStudents] = useState([]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = workSheets.map((n) => n.name);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - workSheets.length) : 0;

  try {
    let foundArr = [];
    let notFoundArr = [];

    students.student_names.forEach((s) => {
      let studentFound = workSheets.find((ws) => ws.student_name === s);

      if (studentFound !== undefined) {
        foundArr.push(studentFound);
      } else {
        notFoundArr.push({ student_name: s, file: "", grade: 0 });
      }
    });

    if (notFoundArr.length > 0) {
      var result = foundArr.concat(notFoundArr);
    }
  } catch (error) {
    console.log(error.message);
  }

  if (!result) {
    return <div>Loading ...</div>;
  } else {
    return (
      <Box sx={{ mt: 1 }} p={3}>
        <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={students.length}
              />
              <TableBody>
                {stableSort(result, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <StyledTableRow hover key={index}>
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.student_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.file === "" ? (
                            <div>Did Not Upload File : (</div>
                          ) : (
                            <Button
                              onClick={() => downloadWorkSheets(row.file)}
                              variant="contained"
                            >
                              Download WorkSheet
                            </Button>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.grade}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.id,
  };
};

export default connect(mapStateToProps)(TestReview);
