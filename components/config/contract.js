export const EscrowSteps = [{
    state: 'AWAITING_PAYMENT',
    name: 'Awaiting Payment',
    description: 'Waiting for buyer to submit ether to contract.'
},
{
    state: 'AWAITING_PRODUCT_SENT',
    name: 'Awaiting Product Sent',
    description: 'Waiting for seller to confirm product has been sent to buyer'
},
{
    state: 'AWAITING_DELIVERY',
    name: 'Awaiting Delivery',
    description: 'Waiting for Buyer to confirm product has been received.'
},
{
    state: 'COMPLETE',
    name: 'Complete',
    description: 'Contract has been completed and is now closed.'
},
{
    state: 'IN_DISPUTE',
    name: 'In Dispute',
    description: 'Contract is in dispute. Dispute actions must be followed.'
},
{
    state: 'CANCELLED',
    name: 'Cancelled',
    description: 'Contract has been cancelled and is now closed'
}
];

export const EscrowActions = {
    AWAITING_PAYMENT: {
        abort: {
            requiredUsers: ['buyer', 'seller'],
            nextState: 'CANCELLED'
        },
        confirmPayment: {
            requiredUsers: ['buyer'],
            nextState: 'AWAITING_PRODUCT_SENT'
        }
    },
    AWAITING_PRODUCT_SENT: {
        confirmProductSent: {
            requiredUsers: ['seller'],
            nextState: 'AWAITING_DELIVERY'
        },
        initDispute: {
            requiredUsers: ['buyer', 'seller'],
            nextState: 'IN_DISPUTE'
        }
    },
    AWAITING_DELIVERY: {
        confirmDelivery: {
            requiredUsers: ['buyer'],
            nextState: 'COMPLETE'
        },
        initDispute: {
            requiredUsers: ['buyer', 'seller'],
            nextState: 'IN_DISPUTE'
        }
    }
}

export const DisputeSteps = ['NO_DISPUTE', 'AWAITING_JUDGE_SELECTION', 'AWAITING_NOMINATION', 'AWAITING_NOMINATION_CONFIRMATION', 'AWAITING_RESOLUTION', 'COMPLETE'];

export const DisputeActions = {
    AWAITING_JUDGE_SELECTION: {
        pickJudge: {
            requiredUsers: ['buyer', 'seller'],
            nextState: ['AWAITING_JUDGE_SELECTION', 'AWAITING_NOMINATION']
        },
        provideTestimony: {
            requiredUsers: ['buyer', 'seller'],
            nextState: null
        }
    },
    AWAITING_NOMINATION: {
        nominateFinalJudge: {
            requiredUsers: ['buyerJudge', 'sellerJudge'],
            nextState: ['AWAITING_NOMINATION_CONFIRMATION']
        },
        provideTestimony: {
            requiredUsers: ['buyer', 'seller'],
            nextState: null
        }
    },
    AWAITING_NOMINATION_CONFIRMATION: {
        confirmFinalJudge: {
            requiredUsers: ['buyerJudge', 'sellerJudge'],
            nextState: ['AWAITING_NOMINATION', 'AWAITING_RESOLUTION']
        },
        provideTestimony: {
            requiredUsers: ['buyer', 'seller'],
            nextState: null
        }
    },
    AWAITING_RESOLUTION: {
        arbtrateDispute: {
            requiredUsers: ['buyerJudge', 'sellerJudge', 'finalJudge'],
            nextState: ['COMPLETE']
        }
    },
    COMPLETE: {
        distributeFunds: {
            requiredUsers: ['buyer', 'seller', 'buyerJudge', 'sellerJudge', 'finalJudge'],
            nextState: null
        }
    }
}

export default { EscrowSteps, EscrowActions, DisputeSteps, DisputeActions }
