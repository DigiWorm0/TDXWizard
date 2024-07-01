import TicketType from "../types/TicketType";

interface KeywordWeights {
    [key: string]: number;
}

const typeToKeywordWeights: { [key in TicketType]: KeywordWeights } = {
    [TicketType.Reimage]: {
        "re image": 1,
        "reimage": 1,
        "re-image": 1,
        "reimaging": 1,
        "re-imaging": 1,
        "imaging": 1
    },
    [TicketType.Enterprise]: {
        "image now": 1,
        "imagenow": 1,
        "imagnow": 1,
        "bp logix": 0.5,
        "bplogix": 0.5,
        "bp logics": 0.5,
        "bplogics": 0.5,
        "perceptive content": 1
    },
    [TicketType.FobRequest]: {
        "fob": 1
    },
    [TicketType.MFA]: {
        "authentication app": 1,
        "microsoft auth": 1,
        "authenticator": 1,
        "duo": 1,

        "authentication code": 1,
        "bypass code": 1,
        "access code": 1,

        "2fa": 1,
        "two factor": 1,
        "two step": 1,
        "2 step": 1,

        "more information required": 1,
        "phone": 0.5
    },
    [TicketType.Software]: {
        "headset": 1,
        "camera": 1,
        "display": 1,
        "monitor": 1,
        "no sound": 1,
        "sound does not work": 1,

        "software renewal": 1,
        "activation": 1,

        "vpn": 1,
        "cisco": 1,
        "docusign": 1,
        "adobe": 1,
        "photoshop": 1,
        "microsoft project": 1,
        "ms project": 1,
        "canva": 1,
        "solidworks": 1,
        "bitlocker": 1,
        "abr": 1,
        "admin by request": 1,
        "splashtop": 1,
        "bluebeam": 1,
        "poppulo": 1,
        "microsoft word": 1,
        "myuw": 1,

        "virus": 1,
        "malicious": 1,

        "set up": 0.5,
        "setup": 0.5,

        "wifi": 1,
        "wi-fi": 1,
        "eduroam": 1,
        "internet": 1
    },
    [TicketType.VoIP]: {
        "voicemails": 1,
        "calling queue": 1,
        "call queue": 1,
        "block calls": 1,
        "phones": 0.5,
        "phone": 0.5,
        "desk phone": 1,
        "extension": 1
    },
    [TicketType.Account]: {
        "trying to log in": 1,
        "unable to sign in": 1,
        "unable to login": 1,
        "reset password": 1,
        "trouble signing in": 1,
        "wont let me log in": 1,
        "unable to sign me in": 1,
        "cant log in": 1,
        "cant get into my account": 1,
        "cant access my account": 1,
        "trouble accessing my email": 1,
        "trouble logging in": 1,
        "issues logging in": 1,

        "account": 0.5,
        "activation": 0.5,
        "activate": 0.5,
        "forgot": 0.5,
        "forgotten": 0.5,
        "password": 0.5,
        "pass word": 0.5,

        "logon": 0.5,
        "log on": 0.5,
        "login": 0.5,
        "log in": 0.5,
        "signin": 0.5,
        "sign in": 0.5,
        "signon": 0.5,
        "sign on": 0.5,

        "deleted account": 1,
        "delete account": 1,

        "locked computer": 1,
        "locked out": 1,

        "aadsts": 2 // Azure AD STS Error Code Prefix
    },
    [TicketType.ClassroomTech]: {},
    [TicketType.ComputerLabs]: {},
    [TicketType.EStout]: {
        "estout": 1,
        "laptop transfer": 1
    },
    [TicketType.CTS]: {
        "new device setup": 1,
        "employee separation notice": 2,
        "employee departure notice": 2,
        "new employee checklist": 2,
        "loaner": 1,
        "name change": 1.5,
        "departure": 1
    },
    [TicketType.Inventory]: {
        "inventory": 1,
        "reassign": 1
    },
    [TicketType.Hardware]: {
        "coaxial cable": 1.5,
        "coax cable": 1.5
    },
    [TicketType.Network]: {
        "ethernet": 1,
        "wifi": 0.5,
        "wi-fi": 0.5,
    },
    [TicketType.Printers]: {
        "print": 1,
        "printed": 1,
        "printer": 1,
        "printing": 1,
        "papercut": 2,
        "paper cut": 2,
        "scan": 1,
        "scans": 1,
        "scanned": 1,
        "scanner": 1,
        "copy machine": 1
    },
    [TicketType.Surplus]: {
        "surplus": 1.5
    },
    [TicketType.Security]: {
        "highseverity alert a potentially malicious url click was detected": 10,
        "microsoft 365 defender has merged the incidents detected in your environment": 10,
        "microsoft 365 defender has detected a security threat": 10,
        "defender for cloud apps suspicious session detected": 10,
        "highseverity alert user restricted from sending email": 10
    },
    [TicketType.Server]: {
        "server": 1
    },
    [TicketType.Canvas]: {
        "webassign": 1,
        "kaltura": 1,
        "katura": 1,
        "redshelf": 1,
        "red shelf": 1,
        "canvas": 0.5,
        "blueprint course": 1
    },
    [TicketType.O365]: {
        "onedrive": 0.5,
        "email": 0.5,
        "emails": 0.5,
        "outlook": 0.5,
        "get outlook for ios": -0.5, // Negative weight to reduce false positives
    }
};

export default typeToKeywordWeights;