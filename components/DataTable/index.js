import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import keycode from "keycode";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// import DeleteIcon from "@material-ui/icons/Delete";

const DataTableHead = (props) => {
  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => {
          return (
            <TableCell
              key={column.id}
              align={column.numeric}
              padding={column.disablePadding ? "none" : "default"}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  //   onClick={() => createSortHandler(column.id)}
                  onClick={createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

DataTableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number,
  columns: PropTypes.array.isRequired,
};

let DataTableToolbar = () => {
  return (
    <Toolbar className="table-header">
      <div className="title">
        <Typography variant="title">Timeline of Contract Events</Typography>
      </div>
      <div className="spacer" />
    </Toolbar>
  );
};

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number,
};

const DataTable = ({ columns, tableData = [] }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("timestamp");
  const [data, setData] = useState(tableData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    console.log("handleRequestSort called", property, orderBy);
    const newOrderBy = property;
    let newOrder = "desc";

    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }

    const items =
      newOrder === "desc"
        ? data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    setData(items);
    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  useEffect(() => {
    setData(tableData || []);
  }, [tableData]);

  return (
    <Paper>
      <DataTableToolbar />
      <div className="flex-auto">
        <div className="table-responsive-material">
          <Table className="">
            <DataTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              columns={columns}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id + Math.random()}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={`${n[column.id] + n.id + Math.random()}`}
                        >
                          {n[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </Paper>
  );
};

export default DataTable;
