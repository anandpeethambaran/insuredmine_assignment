const router = require('express').Router();


//calling the required service
const { searchPolicyInfo, getPolicyInfo } = require('./policy.service');

router.get('/search-policy', searchPolicyInfo)
router.get('/', getPolicyInfo)

module.exports = router;