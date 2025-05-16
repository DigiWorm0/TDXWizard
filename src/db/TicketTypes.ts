const TicketTypes = {
    "Surplus": 998,
    "Enterprise": 996,
    "CTS": 995,
    "Software": 1009,
    "Office": 1010,
    "MFA": 557,
    "Labs": 630,
    "Classroom": 1006,
    "Network": 1002,
    "Printers": 1007,
    "VoIP": 1004,
    "Canvas": 1005,
    "Account Assistance": 994,
    "eStout": 997,
    "Security": 1008,
    "Inventory": 3001,
    "Hardware": 1000,
    "Reimage": 3002,
    "Server": 1003,
    "Fob Req": 2959,
    "Deploy": 1001,
    "Alumni Support": 3415
};
export default TicketTypes;

export type TicketType = keyof typeof TicketTypes;