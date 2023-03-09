import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Switch from 'react-switch';

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import { BiCheckboxSquare, BiCheckDouble, BiCheck, BiX } from "react-icons/bi";

import React, { useState, useEffect } from "react";

const Team = () => {
  const [adminsdata, setAdminsdata] = useState([{ _id: '', username: '', email: '', activePlan: 0, savedTemplatesCount: 0, isToggled: true }]);

  const [totalLiveWebs, setTotalLiveWebs] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);



  const handleToggle = (params) => {
    const updatedAdminsdata = adminsdata.map((admin) =>
      admin.email === params.row.email
        ? { ...admin, isToggled: !admin.isToggled }
        : admin
    );
    setAdminsdata(updatedAdminsdata);
  };
  
  

  useEffect(() => {
    axios.get("http://localhost:8800/api/superadmin/registeredadmins")
      .then((response) => {
        console.log("in useeffect, getting admins and this is count " + response.data.count);
      })
      .catch(error => console.log(error));
  
    axios.get("http://localhost:8800/api/superadmin/getalldataofadmins")
      .then(res => {
        const initialAdminsData = res.data.map(admin => ({...admin, isToggled: true}));
        setAdminsdata(initialAdminsData);
        setTotalLiveWebs(initialAdminsData.reduce((sum, admin) => sum + admin.activePlan, 0));
        console.log("this is admins data+ " + initialAdminsData);
      })
      .catch(error => console.log(error));
  
    axios.get("http://localhost:8800/api/superadmin/gettotalpaymentsandmessages")
      .then(res => {
        setTotalMessages(res.data.messages.length);
        setTotalPayments(res.data.payments.length);
        console.log("this is messages+ ");
      })
      .catch(error => console.log(error));
  }, []);
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "activePlan", headerName: "Active Plan", type: "number", flex: 1 },
    { field: "savedTemplatesCount", headerName: "Saved Templates", type: "number", flex: 1 },
    {
      field: "isToggled",
      headerName: "Status",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{params.value ? "ON" : "OFF"}</Typography>
          <Switch
            checked={params.row.isToggled}
            onChange={() => handleToggle(params)}

          />
        </Box>
      ),
      flex: 1,
    },
    
    
    


  ];


  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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

       <DataGrid checkboxSelection rows={adminsdata} columns={columns} getRowId={(row) => row.email} 
/>

      </Box>
      
    </Box>
    
  );
};

export default Team;
