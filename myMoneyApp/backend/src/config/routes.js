const express = require('express')
module.exports = function (server) {
    const router = express.Router()
    server.use('/api', router)

    const BillinCycle = require('../api/billingCycle/billingCycleService')
    BillinCycle.register(router, '/billingCycles')
}