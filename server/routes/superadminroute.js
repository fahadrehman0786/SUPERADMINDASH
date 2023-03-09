const express = require('express');
const { registeredAdmins , getEmailAndUsernameOfAdmins,  getTotalPaymentsAndMessages, getAllDataOfAdmins, getTransactions, getMessages} =require('../controllers/superadmin.controller');

const router = express.Router();

router.get('/registeredadmins', registeredAdmins);
router.get('/getadminsdata', getEmailAndUsernameOfAdmins);
router.get('/gettotalpaymentsandmessages', getTotalPaymentsAndMessages)
router.get('/getalldataofadmins', getAllDataOfAdmins)
router.get('/gettransactions',getTransactions)
router.get('/getmessages',getMessages)
module.exports = router;