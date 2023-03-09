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
  module.exports = {registeredAdmins, getEmailAndUsernameOfAdmins, getTotalPaymentsAndMessages, getAllDataOfAdmins, getTransactions, getMessages};
