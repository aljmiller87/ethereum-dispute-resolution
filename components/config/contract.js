const EscrowSteps = ['AWAITING_PAYMENT', 'AWAITING_PRODUCT_SENT', 'AWAITING_DELIVERY', 'COMPLETE', 'IN_DISPUTE', 'CANCELLED'];

const EscrowActions = {
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

const DisputeSteps = ['NO_DISPUTE', 'AWAITING_JUDGE_SELECTION', 'AWAITING_NOMINATION', 'AWAITING_NOMINATION_CONFIRMATION', 'AWAITING_RESOLUTION', 'COMPLETE'];

const DisputeActions = {
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