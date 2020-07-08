export const StatusEventABI = [
  {
    type: "uint256",
    name: "timestamp",
    indexed: true,
  },
  {
    type: "address",
    name: "triggeredByUser",
    indexed: true,
  },
  {
    type: "string",
    name: "functionCalled",
    indexed: false,
  },
  {
    type: "string",
    name: "description",
    indexed: false,
  },
];
