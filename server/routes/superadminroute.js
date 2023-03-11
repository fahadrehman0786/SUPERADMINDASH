const express = require('express');
const { registeredAdmins , getEmailAndUsernameOfAdmins,  getTotalPaymentsAndMessages, getAllDataOfAdmins, getTransactions, getMessages, getInvoices, getPieChartData,getBarChartData} =require('../controllers/superadmin.controller');
const { registerMail }= require("../controllers/mailer")

const router = express.Router();

router.get('/registeredadmins', registeredAdmins);
router.get('/getadminsdata', getEmailAndUsernameOfAdmins);
router.get('/gettotalpaymentsandmessages', getTotalPaymentsAndMessages)
router.get('/getalldataofadmins', getAllDataOfAdmins)
router.get('/gettransactions',getTransactions)
router.get('/getmessages',getMessages)
router.get('/getinvoices',getInvoices)
router.post('/mailer',registerMail)
router.get('/getpiechartdata',getPieChartData)
router.get('/getbarchartdata',getBarChartData)

module.exports = router;