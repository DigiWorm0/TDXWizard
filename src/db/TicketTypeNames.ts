import TicketType from "../types/TicketType";

const ticketTypeNames: { [key in TicketType]: string } = {
    [TicketType.Surplus]: "Surplus",
    [TicketType.Enterprise]: "Enterprise",
    [TicketType.CTS]: "CTS",
    [TicketType.Software]: "Software",
    [TicketType.O365]: "Office",
    [TicketType.MFA]: "MFA",
    [TicketType.ComputerLabs]: "Labs",
    [TicketType.ClassroomTech]: "Classroom",
    [TicketType.Network]: "Network",
    [TicketType.Printers]: "Printers",
    [TicketType.VoIP]: "VoIP",
    [TicketType.Canvas]: "Canvas",
    [TicketType.Account]: "Account Assistance",
    [TicketType.EStout]: "eStout",
    [TicketType.Security]: "Security",
    [TicketType.Inventory]: "Inventory",
    [TicketType.Hardware]: "Hardware",
    [TicketType.Reimage]: "Reimage",
    [TicketType.Server]: "Server",
    [TicketType.FobRequest]: "Fob Req",
    [TicketType.Deploy]: "Deploy",
};
export default ticketTypeNames;