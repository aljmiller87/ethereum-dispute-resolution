export const StatusEventABI = [
  { indexed: true, name: "timestamp", type: "uint256" },
  { indexed: false, name: "triggeredByUser", type: "address" },
  { indexed: false, name: "functionCalled", type: "string" },
  { indexed: false, name: "newState", type: "string" },
];

export const TestimonyEventABI = [
  { indexed: true, name: "timestamp", type: "uint256" },
  { indexed: true, name: "witness", type: "address" },
  { indexed: false, name: "description", type: "string" },
];
