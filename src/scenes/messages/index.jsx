import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import ReplyForm from "../../components/ReplyForm";
import Button from '@mui/material/Button';

const Messages = () => {
  const [email, setEmail] = useState('')

  const [fetchData, setFetchData] = useState(true);

  const [open, setOpen]= useState(false);
  const [messageData, setMessageData]= useState([]);
  const handleReply = async (params) => {

     await setEmail(params.row.email)

    console.log(params.row.email); // log the email of the selected row
    setOpen(true)


  };
  
  useEffect(() => {
    if (fetchData) {
      axios.get("http://localhost:8800/api/superadmin/getmessages")
        .then((response) => {
          setMessageData(response.data);
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

    { field: "email", headerName: "Email", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1, align: "left", headerAlign: "left" },
    {
      field: "reply",
      headerName: "Reply",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button onClick={() => handleReply(params)}>Reply</Button>
      ),
    },
    
  ];

  return (
    <>
    <Box m="20px">
      <Header title="Messages" subtitle="Manage Messages" />
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
            color: '#40AFC0',
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
<DataGrid
  checkboxSelection={false}
  rows={messageData}
  columns={columns}
  getRowId={(row) => row.email}
/>
      </Box>
    </Box>
          {open && <ReplyForm email = {email} open={open} setOpen={setOpen}></ReplyForm>}
          </>

  );
};

export default Messages;
