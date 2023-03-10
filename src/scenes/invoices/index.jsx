import { Box, Typography, useTheme } from "@mui/material";
import React from "preact/compat";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Invoices = () => {
   const [invoiceData, setInvoiceData]=useState([])


  useEffect(() => {

      axios.get("http://localhost:8800/api/superadmin/getinvoices")
        .then((response) => {
          setInvoiceData(response.data);
          console.log(response.data + "this is invoice data");
        })
        .catch((error) => {
          console.error(error);
        })
    
  }, []);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [

    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "activePlan",
      headerName: "Active Plan",
      flex: 1,
    },
    {
      field: "accountStatus",
      headerName: "Account Status",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        <DataGrid checkboxSelection={false} rows={invoiceData} columns={columns}  getRowId={(row) => row.email} />
      </Box>
    </Box>
  );
};

export default Invoices;
