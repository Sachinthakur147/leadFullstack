const express = require('express');
const { getAllLeads, createLead, updateLead, deleteLead } = require('../controllers/leadController');
const router = express.Router();

router.get('/leads', getAllLeads);
router.post('/leads', createLead);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

module.exports = router;
