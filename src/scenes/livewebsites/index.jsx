import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Switch from "react-switch";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReplyForm from "../../components/ReplyForm";

const LiveWebsites = () => {
  const [email, setEmail] = useState("");
  const [fetchData, setFetchData] = useState(true);
  const [adminsdata, setAdminsdata] = useState([]);
  const [publishedWebsites, setPublishedWebsites] = useState([]);
  const [noData, setNoData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleReply = async (params) => {
    await setEmail(params.row.email);
    console.log(params.row.email); // log the email of the selected row
    setOpen(true);
  };

  const handleToggle = (params) => {
    const updatedPublishedWebsites = publishedWebsites.map((website) =>
      website.email === params.row.email
        ? { ...website, isToggled: !website.isToggled }
        : website
    );
    setPublishedWebsites(updatedPublishedWebsites);
  };

  useEffect(() => {
    if (fetchData) {
      axios
        .get("http://localhost:8800/api/superadmin/gettemplates")
        .then((response) => {
          setPublishedWebsites(response.data);
          console.log(response.data + "this is transactions data");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setFetchData(false);
        });
    }
  }, [fetchData]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "subdomain", headerName: "Subdomain", flex: 1 },
    { field: "Date", headerName: "Publish Date", flex: 1, align: "left", headerAlign: "left" },
    {
      field: "isToggled",
      headerName: "Status",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch checked={params.row.isToggled} onChange={() => handleToggle(params)} />
        </Box>
      ),
      flex: 1,
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Published Websites" subtitle="Manage Published websites" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection={false} rows={publishedWebsites} columns={columns} getRowId={(row) => row.id} />
        </Box>
      </Box>
      {open && <ReplyForm email={email} open={open} setOpen={setOpen} />}
    </>
  );
};

export default LiveWebsites;
