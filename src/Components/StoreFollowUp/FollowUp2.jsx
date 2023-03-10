import React, { useState, useContext, useEffect } from "react";
import { SnackContext } from "../Context/UserContext";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  TableCell,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
const axios = require("axios");

export function FollowUp2() {
  // const [month, setMonth] = useState();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const { snack, setSnack } = useContext(SnackContext);
  const [open, setOpen] = useState(false);
  const [open_update, setOpen_update] = useState(false);
  const [store_no, setStore_no] = useState();
  const [poc_name, setPoc_name] = useState();
  const [poc_mobile, setPoc_mobile] = useState();
  const [poc_email, setPoc_email] = useState();
  const [follow_1, setFollow_1] = useState();
  const [follow_2, setFollow_2] = useState();
  const [follow_3, setFollow_3] = useState();
  const [bill_paid, setBill_paid] = useState();
  const [notes, setNotes] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [checked, setChecked] = useState();
  const [disable, setDisable] = useState(true);
  const [id, setId] = useState();
  var today = new Date();
  var month_now = moment(today).format("MMMM");
  const [month, setMonth] = useState(month_now);
  const month_name = [
    { id: "01-2022", month: "January" },
    { id: "02-2022", month: "February" },
    { id: "03-2022", month: "March" },
    { id: "04-2022", month: "April" },
    { id: "05-2022", month: "May" },
    { id: "06-2022", month: "June" },
    { id: "07-2022", month: "July" },
    { id: "08-2022", month: "August" },
    { id: "09-2022", month: "September " },
    { id: "10-2022", month: "October" },
    { id: "11-2022", month: "November" },
    { id: "12-2022", month: "December" },
  ];

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("month", month);
    setLoading(true);
    axios.post("/api/follow_monthly", formdata).then(function (res) {
      if (res.data.status === true) {
        // console.log(month);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  }, []);

  const monthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(month);
    const formdata = new FormData();
    formdata.append("month", month);
    await axios.post("/api/follow_monthly", formdata).then(function (res) {
      console.log("hi");
      if (res.data.status === true) {
        console.log(month);
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("month", month);
    formdata.append("store_no", store_no);
    formdata.append("poc_name", poc_name);
    formdata.append("poc_mobile", poc_mobile);
    formdata.append("poc_email", poc_email);

    formdata.append("follow1", follow_1);
    formdata.append("follow2", follow_2);
    formdata.append("follow3", follow_3);
    formdata.append("bill_paid", bill_paid);
    formdata.append("mms", notes);
    await axios.post("/api/edit_follow", formdata).then(function (res) {
      console.log("hiiiiiii");
      if (res.data.status === true) {
        setOpen(false);
        const form_data = new FormData();
        form_data.append("month", month);
        axios.post("/api/follow_monthly", form_data).then(function (resp) {
          console.log("hi");
          if (resp.data.status === true) {
            console.log(month);
            console.log(resp.data.data);
            setData(resp.data.data);
          }
        });
        setSnack({
          message: res.data.msg,
          type: "success",
          open: true,
        });
        // monthSubmit();
      } else {
        setSnack({
          message: res.data.msg,
          type: "error",
          open: true,
        });
      }
    });
  };
  const updateSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    console.log(JSON.stringify(selectedRows));
    formdata.append("bulk_update", JSON.stringify(selectedRows));
    formdata.append("follow1", follow_1);
    formdata.append("follow2", follow_2);
    formdata.append("follow3", follow_3);
    formdata.append("billpaid", bill_paid);
    formdata.append("mms", notes);
    await axios
      .post("/api/followup_bulk_update", formdata)
      .then(function (res) {
        console.log("hiiiiiii");
        if (res.data.status === true) {
          setOpen_update(false);
          const form_data = new FormData();
          form_data.append("month", month);
          axios.post("/api/follow_monthly", form_data).then(function (resp) {
            console.log("hi");
            if (resp.data.status === true) {
              console.log(month);
              console.log(resp.data.data);
              setData(resp.data.data);
            }
          });
          setSnack({
            message: res.data.msg,
            type: "success",
            open: true,
          });
        }
      });
  };
  return (
    <Box sx={{ m: 12, height: "500px" }}>
      <Grid container>
        {" "}
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="h4">Follow Up</Typography>
          {console.log(selectedRows)}
          <Button
            disabled={disable}
            variant="contained"
            size="small"
            onClick={() => setOpen_update(true)}
          >
            update
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <form onSubmit={monthSubmit}>
            <TextField
              select
              fullwidth
              size="small"
              label="Month"
              name="month"
              variant="outlined"
              value={month}
              sx={{
                borderRadius: "8px",
                width: "45%",
              }}
              onChange={(e) => setMonth(e.target.value)}
            >
              {month_name.map((months) => (
                <MenuItem value={months.month}>{months.month}</MenuItem>
              ))}
            </TextField>
            &nbsp;&nbsp;
            <Button type="submit" size="small" variant="contained">
              search
            </Button>
          </form>{" "}
        </Grid>
      </Grid>

      <Box
        sx={{
          m: 2,
          height: 500,
          width: 1000,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper} sx={{ backgroundColor: "#f9f2e8" }}>
          <Table stickyHeader size="small">
            <TableHead sx={{ backgroundColor: "#2f7d32", color: "white" }}>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#2f7d32", color: "white" }}
                ></TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>ID</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Store No.</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>Store Code</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "95%",
                  }}
                >
                  <Typography>Store Name</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> POC Name</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography> POC Mob. </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "25%",
                  }}
                >
                  <Typography>M&S Email </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "15%",
                  }}
                >
                  <Typography> Follow-1</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "15%",
                  }}
                >
                  <Typography> Follow-2</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "25%",
                  }}
                >
                  <Typography> Follow-3</Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#2f7d32",
                    color: "white",
                    width: "5%",
                  }}
                >
                  <Typography>Bill Paid</Typography>
                </TableCell>
                <TableCell sx={{ backgroundColor: "#2f7d32", color: "white" }}>
                  <Typography>MMS</Typography>
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#2f7d32", color: "white" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            {/* {loading ? (
              <></>
            ) : ( */}
            {data.map((data) => (
              <TableBody sx={{ backgroundColor: "white" }}>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        setChecked(e.target.value);
                        console.log(checked);
                        setId(data.id);
                        console.log(id);
                        setDisable(false);
                        setSelectedRows([...selectedRows, id]);
                        console.log(selectedRows);
                      }}
                    ></Checkbox>
                  </TableCell>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.store_no}</TableCell>
                  <TableCell>{data.store_code}</TableCell>
                  <TableCell>{data.store_name}</TableCell>
                  <TableCell>{data.poc_name}</TableCell>
                  <TableCell>{data.poc_mobile}</TableCell>
                  <TableCell>{data.poc_email}</TableCell>
                  <TableCell>{data.follow1}</TableCell>
                  <TableCell>{data.follow2}</TableCell>
                  <TableCell>{data.follow3}</TableCell>
                  <TableCell>{data.bill_paid}</TableCell>
                  <TableCell>{data.mms}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        // editData(data.store_no);
                        setStore_no(data.store_no);
                        setPoc_name(data.poc_name);
                        setPoc_mobile(data.poc_mobile);
                        setPoc_email(data.poc_email);
                        setFollow_1(data.follow1);
                        setFollow_2(data.follow2);
                        setFollow_3(data.follow3);
                        setBill_paid(data.bill_paid);
                        setNotes(data.mms);
                        setOpen(true);
                      }}
                    >
                      edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </TableContainer>
        <Dialog open={loading} onClose={() => {}}>
          <DialogContent>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton>
                <CircularProgress />
              </IconButton>
              <DialogContentText>Please wait....</DialogContentText>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                height: "50%",
                width: "95%",
              }}
            >
              <DialogContent>
                <DialogContentText>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid container>
                      <Typography sx={{ my: 2, mx: 15 }} variant="h5">
                        followUp MonthlyReports
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        disabled
                        size="small"
                        name="month"
                        label="Month"
                        value={month}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setMonth(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        disabled
                        size="small"
                        name="storeno"
                        label="Store No."
                        value={store_no}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setStore_no(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocname"
                        label="POC Name."
                        value={poc_name}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_name(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocmobile"
                        label="POC Mobile Number"
                        value={poc_mobile}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_mobile(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="pocemail"
                        label="POC Email"
                        value={poc_email}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setPoc_email(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="first_follow"
                        label="Firstfollowup"
                        value={follow_1}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_1(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="second_follow"
                        label="Secondfollowup"
                        value={follow_2}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_2(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="third_follow"
                        label="Thirdfollowup"
                        value={follow_3}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_3(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="bill_received"
                        label="BillReceived"
                        value={bill_paid}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setBill_paid(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="notes"
                        label="MMS"
                        value={notes}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    back
                  </Button>
                  <Button size="small" variant="contained" type="submit">
                    save
                  </Button>
                </Grid>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
        <Dialog
          open={open_update}
          onClose={() => {
            setOpen_update(false);
          }}
        >
          <form onSubmit={updateSubmit}>
            <Box
            // sx={{
            //   height: "50%",
            //   width: "95%",
            // }}
            >
              <DialogContent>
                <DialogContentText>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Grid container>
                      <Typography sx={{ my: 2, mx: 5 }} variant="h5">
                        Bulk Update
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        name="first_follow"
                        label="Firstfollowup"
                        value={follow_1}
                        sx={{ m: 2 }}
                        onChange={(e) => setFollow_1(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="second_follow"
                        label="Secondfollowup"
                        value={follow_2}
                        sx={{ m: 2, width: "100%" }}
                        onChange={(e) => setFollow_2(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        variant="outlined"
                        name="third_follow"
                        label="Thirdfollowup"
                        value={follow_3}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setFollow_3(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        select
                        size="small"
                        name="bill_received"
                        label="BillReceived"
                        value={bill_paid}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setBill_paid(e.target.value)}
                      >
                        <MenuItem value="">--None--</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        size="small"
                        name="notes"
                        label="MMS"
                        value={notes}
                        sx={{ m: 2, width: "80%" }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></TextField>
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    back
                  </Button>
                  <Button size="small" variant="contained" type="submit">
                    save
                  </Button>
                </Grid>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
      </Box>
    </Box>
  );
}
