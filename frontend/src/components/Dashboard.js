import UserService from "../services/user.service";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Icon, IconButton } from "@mui/material";
import { format } from "date-fns";

import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrivalForm from "./ArrivalForm";

const Dashboard = (props) => {
  const [data, setData] = useState(null);
  const [isForm, setIsForm] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    UserService.getArrivals().then((result) => {
      console.log(result.data);
      setData(result.data);
    });
  }, []);

  const formatDate = (date) => {
    const dateTime = Date.parse(date);
    return format(dateTime, "kk:mm:ss dd/MM/yyyy");
  };

  const setAdd = () => {
    setFormData(null);
    setIsForm(!isForm);
  };

  const setEdit = (arrival) => {
    setFormData(arrival);
    setIsForm(!isForm);
  };

  const setDelete = (id) => {
    UserService.deleteArrival(id).then(() => {
      UserService.getArrivals().then((result) => {
        setData(result.data);
      });
    });
  };

  return (
    <div className="col-md-12">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          justifyContent: "space-between",
          width: "600px",
        }}
      >
        <h1>Arrivals</h1>
        <IconButton onClick={setAdd}>
          <AddIcon />
        </IconButton>
      </div>
      {isForm ? (
        <ArrivalForm
          setDisplay={setIsForm}
          data={formData}
          setFormData={setFormData}
        />
      ) : null}
      <TableContainer
        component={Paper}
        style={{ margin: "auto", borderRadius: "20px", width: "600px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date and time</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">
                    {formatDate(row.arrivedAt)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => setEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
