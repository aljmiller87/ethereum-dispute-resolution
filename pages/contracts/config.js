const escrowSteps = [
    {
        id: 'AWAITING_PAYMENT',
        name: 'Awaiting Payment',
        availableActions: [
            {
                functionName: 'confirmPayment',
                authorizedUser: 'buyer',
                nextStep: 'AWAITING_PRODUCT_SENT'
            },
            {
                functionName: 'abort',
                authorizedUser: 'seller',
                isNextStep: 'CANCELLED'
            }
        ]
    },
    {
        id: 'AWAITING_PRODUCT_SENT',
        name: 'Awaiting Product Sent',
        availableActions: [
            {
                functionName: 'abort',
                authorizedUser: 'seller',
                isNextStep: 'CANCELLED'
            },
            {
                functionName: 'confirmProductSent',
                authorizedUser: 'seller',
                isNextStep: 'AWAITING_DELIVERY'

            },
            {
                functionName: 'initDispute',
                authorizedUser: 'buyer',
                isNextStep: 'IN_DISPUTE'
            }
        ]
    },
    {
        id: 'AWAITING_DELIVERY',
        name: 'Awaiting Delivery',
        availableActions: [
            {
                functionName: 'confirmDelivery',
                authorizedUser: 'buyer',
                isNextStep: 'COMPLETE'
            },
            {
                functionName: 'initDispute',
                authorizedUser: 'buyer',
                isNextStep: 'IN_DISPUTE'
            }
        ]
    },
    {
        id: 'COMPLETE',
        name: 'Complete',
        availableActions: []
    },
    {
        id: 'IN_DISPUTE',
        name: 'In Dispute',
        availableActions: []
    },
    {
        id: 'CANCELLED',
        name: 'Cancelled',
        availableActions: []
    }
];

const disputeSteps = [

];