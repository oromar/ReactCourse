const restful = require('node-restful')
const mongoose = restful.mongoose

const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true },
    status: { type: String, required: false, 
        enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nome obrigatório'] },
    month: { type: Number, min: [1, 'Mês inválido.'], max: [12, 'Mês inválido.'], required: [true, 'Mês obrigatório'] },
    year: { type: Number, min: [1970, 'Ano inválido.'], max: [2100, 'Ano inválido.'], required: [true, 'Ano obrigatório'] },
    credits:[creditSchema],
    debts: [debtSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)
