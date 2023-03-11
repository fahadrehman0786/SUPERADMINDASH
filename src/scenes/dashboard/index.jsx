import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { BiCheckboxSquare, BiCheckDouble, BiCheck, BiX } from "react-icons/bi";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import PieChart from "../../components/PieChart";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [count, setCount] = useState('')
  const [adminsdata, setAdminsdata]= useState();
  const [transactionData, setTransactionData]= useState([]);
  const [totalLiveWebs, setTotalLiveWebs] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);





  useEffect(() => {
      console.log("in useeffect, getting admins and this iscount "+{count})
      axios.get("http://localhost:8800/api/superadmin/registeredadmins")
      .then((response) => {
        setCount(response.data.count);
        console.log("this is count respnse+ "+response.data.count)
      });
      console.log("this is count+ "+count)

       axios.get("http://localhost:8800/api/superadmin/getadminsdata")
      .then(res => {

        setAdminsdata(res.data.adminsData);
        setTotalLiveWebs(res.data.totalLiveWebs);

        console.log("thisi s admins data+ "+adminsdata)
      })
      .catch(error => console.log(error));

      axios.get("http://localhost:8800/api/superadmin/gettotalpaymentsandmessages")
      .then(res => {

        setTotalMessages(res.data.messages.length);
        setTotalPayments(res.data.payments.length);
        console.log("this is messages+ ")

      })
      .catch(error => console.log(error));

      axios.get("http://localhost:8800/api/superadmin/gettransactions")
    .then((response) => {
      setTransactionData(response.data)
    console.log(response.data+"this is transactions data");
    })
    .catch((error) => {
    console.error(error);
    });
    

    }, [count,totalLiveWebs,totalPayments,totalMessages]);

    adminsdata && adminsdata.map((row,index) => (
      console.log("this is map: "+ row.savedTemplatesCount)
    ))



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="uCraft Super Admin Dashboard" />

        <Box>

        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
        
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalMessages}
            
            subtitle="Messages"
            progress="0.75"
            
          
            icon={
              <EmailIcon
              style={{color:'#40AFC0'}}
                sx={{ fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalLiveWebs}
            subtitle="Live Websites"
            progress="0.50"
          
            icon={
              <PointOfSaleIcon
              style={{color:'#40AFC0'}}
                sx={{fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={count}
            subtitle="Total Users"
            progress="0.30"

            icon={
              <PersonAddIcon
              style={{color:'#40AFC0'}}
                sx={{  fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPayments}
            subtitle="Payments"
            progress="0.80"
     
            icon={
              <TrafficIcon
              style={{color:'#40AFC0'}}
                sx={{ fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {transactionData.map((transaction, i) => (
            <Box
             
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  style={{color:'#40AFC0'}}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.activePlan}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.paymentDate}</Box>
              <Box
                backgroundColor='#40AFC0'
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.amount}
              </Box>

            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
  
                  <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Plans Pie Chart
          </Typography>
          <Box height="250px" mt="-20px"
          >
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Templates Bar Chart
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
