export const EscrowState = [
  "AWAITING_PAYMENT",
  "AWAITING_PRODUCT_SENT",
  "AWAITING_DELIVERY",
  "IN_DISPUTE",
  "CANCELLED",
  "COMPLETE",
];

export const EscrowSteps = {
  AWAITING_PAYMENT: {
    actions: {
      abort: {
        slug: "abort",
        name: "Abort",
        requiredUsers: ["buyer", "seller"],
        nextState: "CANCELLED",
        description:
          "Either buyer or seller can abort at this time. This will result in the contract being cancelled. Buyer will not be able to submit payment once cancelled.",
      },
      confirmPayment: {
        slug: "confirmPayment",
        name: "Confirm Payment",
        requiredUsers: ["buyer"],
        nextState: "AWAITING_PRODUCT_SENT",
        description:
          'Only the buyer can submit payment. Submitting payment will  move the contract to the state of "Awaiting Product Sent".',
      },
    },
    name: "Awaiting Payment",
    description:
      "Waiting for buyer to submit ether to contract. Alternatively, either buyer or seller can abort contract to prevent contract from receiving ether.",
  },
  AWAITING_PRODUCT_SENT: {
    actions: {
      confirmProductSent: {
        slug: "confirmProductSent",
        name: "Confirm Product Sent",
        requiredUsers: ["seller"],
        nextState: "AWAITING_DELIVERY",
        description: "UPDATE THIS DESCRIPTION.",
      },
      initDispute: {
        slug: "initDispute",
        name: "Initiate Dispute",
        requiredUsers: ["buyer", "seller"],
        nextState: "IN_DISPUTE",
        description: "UPDATE THIS DESCRIPTION.",
      },
    },
    name: "Awaiting Product Sent",
    description: "Waiting for seller to confirm product has been sent to buyer",
  },
  AWAITING_DELIVERY: {
    actions: {
      confirmDelivery: {
        slug: "confirmDelivery",
        name: "Confirm Delivery",
        requiredUsers: ["buyer"],
        nextState: "COMPLETE",
        description: "UPDATE THIS DESCRIPTION.",
      },
      initDispute: {
        slug: "initDispute",
        name: "Initiate Dispute",
        requiredUsers: ["buyer", "seller"],
        nextState: "IN_DISPUTE",
        description: "UPDATE THIS DESCRIPTION.",
      },
    },
    name: "Awaiting Delivery",
    description: "Waiting for Buyer to confirm product has been received.",
  },
  COMPLETE: {
    actions: {},
    name: "Complete",
    description: "Contract has been completed and is now closed.",
  },
  IN_DISPUTE: {
    actions: {},
    name: "In Dispute",
    description: "Contract is in dispute. Dispute actions must be followed.",
  },
  CANCELLED: {
    actions: {},
    name: "Cancelled",
    description: "Contract has been cancelled and is now closed",
  },
};

export const DisputeState = [
  "NO_DISPUTE",
  "AWAITING_JUDGE_SELECTION",
  "AWAITING_NOMINATION",
  "AWAITING_NOMINATION_CONFIRMATION",
  "AWAITING_RESOLUTION",
  "COMPLETE",
];

export const DisputeSteps = {
  AWAITING_JUDGE_SELECTION: {
    pickJudge: {
      requiredUsers: ["buyer", "seller"],
      nextState: ["AWAITING_JUDGE_SELECTION", "AWAITING_NOMINATION"],
    },
    provideTestimony: {
      requiredUsers: ["buyer", "seller"],
      nextState: null,
    },
  },
  AWAITING_NOMINATION: {
    nominateFinalJudge: {
      requiredUsers: ["buyerJudge", "sellerJudge"],
      nextState: ["AWAITING_NOMINATION_CONFIRMATION"],
    },
    provideTestimony: {
      requiredUsers: ["buyer", "seller"],
      nextState: null,
    },
  },
  AWAITING_NOMINATION_CONFIRMATION: {
    confirmFinalJudge: {
      requiredUsers: ["buyerJudge", "sellerJudge"],
      nextState: ["AWAITING_NOMINATION", "AWAITING_RESOLUTION"],
    },
    provideTestimony: {
      requiredUsers: ["buyer", "seller"],
      nextState: null,
    },
  },
  AWAITING_RESOLUTION: {
    arbtrateDispute: {
      requiredUsers: ["buyerJudge", "sellerJudge", "finalJudge"],
      nextState: ["COMPLETE"],
    },
  },
  COMPLETE: {
    distributeFunds: {
      requiredUsers: [
        "buyer",
        "seller",
        "buyerJudge",
        "sellerJudge",
        "finalJudge",
      ],
      nextState: null,
    },
  },
};

export default { EscrowState, EscrowSteps, DisputeState, DisputeSteps };
