const mongoose = require("mongoose");
const Payment = require("../models/Payment")
const Message = require ("../models/Message")
const SuperAdmin = require("../models/SuperAdmin");
const Admin = require("../models/Admin");
require('dotenv').config();

const getTotalPaymentsAndMessages = async (req, res) => {

    try {
      const Superadmin = await SuperAdmin.findById('6403a03f270a91ab0e2925ad')
  
      console.log("********"+Superadmin.messages.length)
      console.log("************"+Superadmin.payments.length)
  
      res.json(Superadmin); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  const getEmailAndUsernameOfAdmins = async (req, res) => {
    let totalLiveWebs = 0;
    try {
      const admins = await Admin.find({}, 'email username activePlan savedTemplates'); // Fetch users with only email and username fields
      const adminsData = admins.map(admin => ({
        email: admin.email,
        username: admin.username,   
        activePlan: admin.activePlan,
        savedTemplatesCount: admin.savedTemplates ? admin.savedTemplates.length : 0,
  
  
      }));
      console.log(adminsData);
      
      adminsData.forEach(admin => {
        totalLiveWebs += admin.savedTemplatesCount;
      });
      console.log(totalLiveWebs);
      const responseData = {
        adminsData: adminsData,
        totalLiveWebs: totalLiveWebs
      }
      res.json(responseData); // Send the user data and total live webs as a JSON response
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  const registeredAdmins = async (req, res) => {
    try {
      const count = await Admin.countDocuments({});
      res.json({ count });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }


  const getAllDataOfAdmins = async (req, res) => {
    let totalLiveWebs = 0;
    try {
      const admins = await Admin.find({}, 'email username activePlan savedTemplates'); // Fetch users with only email and username fields
      const adminsData = admins.map(admin => ({
        email: admin.email,
        username: admin.username,   
        activePlan: admin.activePlan,
        savedTemplatesCount: admin.savedTemplates ? admin.savedTemplates.length : 0,
  
  
      }));
      console.log(adminsData);
      
      res.json(adminsData); // Send the user data and total live webs as a JSON response
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  const getTransactions = async(req, res)=>{
      
  try {
    // find the SuperAdmin document with the specified ID and populate the "payments" array with Payment data
    const superAdmin = await SuperAdmin.findById("6403a03f270a91ab0e2925ad").populate("payments", "amount paymentDate activePlan");

    // extract the relevant data from the populated "payments" array
    const paymentsData = superAdmin.payments.map((payment) => {
      return {
        amount: payment.amount,
        paymentDate: payment.paymentDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }),
        activePlan: payment.activePlan,
      };
    });

    // send the extracted data as a response to the frontend
    res.json(paymentsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

  }
  

  const getMessages = async(req, res)=>{
      
    try {
      // find the SuperAdmin document with the specified ID and populate the "messages" array with Message data
      const superAdmin = await SuperAdmin.findById("6403a03f270a91ab0e2925ad").populate("messages", "subject email message");
  
      // extract the relevant data from the populated "payments" array
      const messagesData = superAdmin.messages.map((message) => {
        return {
          message: message.message,
          email: message.email,
          subject: message.subject,
        };
      });
  
      // send the extracted data as a response to the frontend
      res.json(messagesData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  
    }

    const getInvoices = async (req, res)=>{
      try {
        const admins = await Admin.find({ transactionID: { $exists: true } })
          .populate({
            path: 'transactionID',
            select: 'activePlan amount'
          })
          .select('username email accountStatus transactionID');
    
        const result = admins.map((admin) => {
          return {
            username: admin.username,
            email: admin.email,
            accountStatus: admin.accountStatus,
            activePlan: admin.transactionID.activePlan,
            amount: admin.transactionID.amount
          }
        });
    
        res.json(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }

    }

    const getPieChartData = async(req,res)=>{

      try {

        
        // Get count for each active plan
        const basicCount = await Admin.countDocuments({ activePlan: 'Basic' });
        const starterCount = await Admin.countDocuments({ activePlan: 'Starter' });
        const professionalCount = await Admin.countDocuments({ activePlan: 'Professional' });
        const organizationCount = await Admin.countDocuments({ activePlan: 'Organization' });
    
        // Store counts in an array with the desired format
        const countsArray = [
          {
            id: 'basic',
            label: 'basic',
            value: basicCount,
            color: 'hsl(104, 70%, 50%)'
          },
          {
            id: 'starter',
            label: 'starter',
            value: starterCount,
            color: 'hsl(162, 70%, 50%)'
          },
          {
            id: 'professional',
            label: 'professional',
            value: professionalCount,
            color: 'hsl(291, 70%, 50%)'
          },
          {
            id: 'organization',
            label: 'organization',
            value: organizationCount,
            color: 'hsl(229, 70%, 50%)'
          }
        ];
    
        // Send counts array as response
        console.log(countsArray)
        res.status(200).json(countsArray);
    
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      }


    }

    const getBarChartData = async (req, res) => {
      try {
        const templateTypes = ['blog', 'ecommerce', 'medical', 'job'];
        const planCounts = {};
    
        // Loop through all the template types
        for (const type of templateTypes) {
          // Get the count of each plan for the current template type
          const countByPlan = await Admin.aggregate([
            {
              $unwind: '$savedTemplates'
            },
            {
              $match: {
                'savedTemplates.type': type
              }
            },
            {
              $group: {
                _id: '$activePlan',
                count: {
                  $sum: 1
                }
              }
            }
          ]);
    
          // Add the count for each plan to the planCounts object
          for (const { _id: plan, count } of countByPlan) {
            if (!planCounts[plan]) {
              planCounts[plan] = {};
            }
            planCounts[plan][type] = count;
          }
        }
    
        // Generate the chart data in the required format
        const chartData = [];
        for (const type of templateTypes) {
          const chartDataItem = {

            country: type.charAt(0).toUpperCase() + type.slice(1),
            starter: Math.floor(Math.random() * 50) + 1,
            
            //starter: planCounts['Basic']?.[type] || 0, // use optional chaining operator
            starterColor: 'hsl(229, 70%, 50%)',
            professional: Math.floor(Math.random() * 50) + 1,
            //professional: planCounts['Professional']?.[type] || 0, // use optional chaining operator
            professionalColor: 'hsl(296, 70%, 50%)',
            organization: Math.floor(Math.random() * 50) + 1,
            //organization: planCounts['Community']?.[type] || 0, // use optional chaining operator
            organizationColor: 'hsl(97, 70%, 50%)'
          };
          chartData.push(chartDataItem);
        }
    
        console.log(chartData);
        res.json(chartData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
  module.exports = {registeredAdmins, getEmailAndUsernameOfAdmins, getTotalPaymentsAndMessages, getAllDataOfAdmins, getTransactions, getMessages, getInvoices, getPieChartData, getBarChartData};
