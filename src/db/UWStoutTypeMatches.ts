// noinspection SpellCheckingInspection

interface KeywordWeight {
    [key: string]: number;
}

interface GroupWeight {
    [key: string]: number;
}

/**
 * The weights for each group for each ticket type.
 * The higher the weight, the more likely the ticket is of that type.
 *
 * @example
 * ```
 * typeID: {
 *     groupName: weight,
 * }
 * ```
 *
 * @remarks
 * Groups are all lowercase w/ alphanumeric & spaces only.
 */
export const UWStoutTypeAssignments: Record<number, GroupWeight> = {
    1006: {
        "classroom technologies": 2
    },
    1004: {
        "voip": 2
    },
    1003: {
        "server": 2
    },
    1002: {
        "network": 2
    },
    1000: {
        "vanguard": 2,
        "qa": 2,
    },
    996: {
        "website": 2,
        "imagenow": 2,
        "peoplesoft": 2
    },
    630: {
        "lab and software": 1
    }
};

/**
 * The weights for each keyword for each ticket type.
 * The higher the weight, the more likely the ticket is of that type.
 *
 * @example
 * ```
 * typeID: {
 *     keyword: weight,
 * }
 * ```
 *
 * @remarks
 * Keywords are all lowercase w/ alphanumeric & spaces only.
 * Special characters are removed from the title and description before matching.
 * Keywords must match the whole word, not just part of a word.
 */
export const UWStoutTypeKeywords: Record<number, KeywordWeight> = {
    // Reimage
    3002: {
        "re image": 1,
        "reimage": 1,
        "reimaging": 1,
        "re imaging": 1,
        "reimaged": 1,
        "imaging": 1
    },

    // Enterprise
    996: {
        "image now": 1,
        "imagenow": 1,
        "imagnow": 1,
        "lforms": 1,
        "workflow queue": 1,
        "perceptive content": 1,

        "bp logix": 0.5,
        "bplogix": 0.5,
        "bp logics": 0.5,
        "bplogics": 0.5,
        "form": 1,

        "peoplesoft": 1,
        "people soft": 1,
        "accessstout": 1,
        "access stout": 1,
        "oracle": 1,

        "workday": 1,

        "website": 0.5,
    },

    // Fob
    2959: {
        "fob": 1
    },

    // 2FA
    557: {
        "authentication app": 1,
        "microsoft auth": 1,
        "authenticator": 1,
        "authentication": 1,
        "duo": 1,

        "authentication code": 1,
        "bypass code": 1,
        "bypass security code": 1,
        "access code": 1,
        "temporary access pass": 2,
        "tap": 1,

        "2fa": 1,
        "two factor": 1,
        "two step": 1,
        "2 step": 1,

        "mfa": 1,
        "multifactor": 1,
        "multi factor": 1,
        "multistep": 1,
        "multi step": 1,

        "more information required": 1,
        "phone": 0.5
    },

    // Software
    1009: {
        "headset": 1,
        "camera": 0.5,
        "display": 1,
        "monitor": 1,
        "monitors": 1,
        "no sound": 1,
        "sound does not work": 1,

        "software renewal": 1,
        "activation": 1,
        "activate": 1,

        "vpn": 1,
        "cisco": 1,
        "docusign": 1,
        "adobe": 1,
        "creative cloud": 1,
        "photoshop": 1,
        "microsoft project": 1,
        "ms project": 1,
        "canva": 1,
        "solidworks": 1,
        "bitlocker": 1,
        "recovery key": 1,
        "abr": 1,
        "admin by request": 1,
        "splashtop": 1,
        "bluebeam": 1,
        "poppulo": 1,
        "microsoft word": 1,
        "new york times": 1,
        "access stout": 0.5,
        "zoom": 1,
        "revit": 1,
        "windows": 0.5,
        "webwork": 1,
        "acad": 1,
        "software center": 1,
        "google": 1,
        "foodpro": 1,
        "food pro": 1,
        "myuw": 1,
        "my uw": 0.5,
        "my uw stout": -0.5, // Negative weight to reduce false positives
        "avd": 1, // Azure Virtual Desktop
        "virtual desktop": 1,
        "virtual machine": 1,

        "driver": 1,
        "drivers": 1,
        "not booting": 1,

        "bsod": 0.5, // Blue Screen of Death
        "virus": 1,
        "malicious": 1,

        "admin": 0.5,
        "install": 1,
        "recover": 0.5,
        "set up": 0.5,
        "setup": 0.5,

        "wifi": 1,
        "wi fi": 1,
        "eduroam": 1,
        "edirome": 1,
        "internet": 1,

        "chrome": 0.5,
        "edge": 0.5,
        "firefox": 0.5,
        "safari": 0.5,
        "browser": 0.5
    },

    // VoIP
    1004: {
        "voicemails": 1,

        "calling queue": 1,
        "call queue": 1,
        "cq": 1,

        "block calls": 1,

        "phones": 0.5,
        "phone": 0.5,
        "desk phone": 1,

        "extension": 0.5
    },

    // Account
    994: {
        "trying to log in": 1,
        "unable to sign in": 1,
        "unable to login": 1,
        "trouble signing in": 1,
        "wont let me log in": 1,
        "unable to sign me in": 1,
        "cant log in": 1,
        "cant get into my account": 1,
        "cant access my account": 1,
        "trouble accessing my email": 1,
        "trouble logging in": 1,
        "issues logging in": 1,
        "trouble signing into": 1,

        "account": 0.5,
        "activating": 0.5,
        "activation": 0.5,
        "activate": 0.5,
        "forgot": 0.5,
        "forgotten": 0.5,
        "password": 0.5,
        "pass word": 0.5,
        "passcode": 0.5,
        "expired": 0.5,

        "password expired": 1,
        "reset password": 1,
        "password reset": 1,

        "logon": 0.5,
        "log on": 0.5,
        "login": 0.5,
        "log in": 0.5,
        "signin": 0.5,
        "sign in": 0.5,
        "signon": 0.5,
        "sign on": 0.5,

        "locked computer": 1,
        "locked out": 1,

        "username": 0.5,
        "user name": 0.5,

        "aadsts": 2 // Azure AD STS Error Code Prefix
    },

    // Classroom
    1006: {
        "projector": 0.5,
        "projectors": 0.5,
        "projecter": 0.5,
        "projecters": 0.5,
    },

    // EStout
    997: {
        "estout": 1,
        "exchange": 1,

        "return": 0.5,
        "returning": 0.5,

        "laptop transfer": 1,
        "laptop ownership": 1,
        "laptop pickup": 1,
        "laptop upgrade": 1,
        "computer return": 1,
        "after graduation": 1,
        "turn my laptop in": 1,
        "mail in my laptop": 1,
        "graduation": 1,
        "graduate": 1,
        "graduated": 1,

        "ownership": 0.5,
        "lost": 0.5,
        "missing": 0.5,
        "hours": 0.5
    },

    // CTS
    995: {
        "new device setup": 1,
        "employee separation notice": 2,
        "employee departure notice": 2,
        "new employee checklist": 2,
        "loaner": 0.5,
        "name change": 1.5,
        "departure": 1,
        "consultant": 1
    },

    // Inventory
    3001: {
        "inventory": 1,
        "reassign": 1,
        "location change": 1,
        "owner": 1,
        "automated report delivery": 1.5,
    },

    // Hardware Repair
    1000: {
        "repair": 1.5,
        "repaired": 1.5,
        "replaced": .5,
        "coaxial cable": 1.5,
        "coax cable": 1.5,
        "blacking out": 1,
        "not charging": 1,
        "parts ordered crm": 1,
        "tv": 1,
    },

    // Network
    1002: {
        "ethernet": 1,
        "wifi": 1,
        "wi fi": 1,
        "ip address": 1,
        "ip addr": 1,

        "ap": 1,
        "access point": 1,

        "internet": 0.5,
        "network": 0.5,
        "port": 0.5,
    },

    // Printing
    1007: {
        "mfd": 1,
        "print": 1,
        "printed": 1,
        "printer": 1,
        "printers": 1,
        "printing": 1,
        "multifunction": 0.5,

        "papercut": 2,
        "paper cut": 2,
        "scan": 1,
        "scans": 1,
        "scanned": 1,
        "scanner": 1,
        "copy machine": 1,
        "university of wisconsin purchase order": 5
    },

    // Surplus
    998: {
        "surplus": 1.5,
        "surplussing": 1.5,
        "surplusing": 1.5,
    },

    // Security
    1008: {
        "high severity alert a potentially malicious url click was detected": 10,
        "microsoft 365 defender has merged the incidents detected in your environment": 10,
        "microsoft 365 defender has detected a security threat": 10,
        "defender for cloud apps suspicious session detected": 10,
        "high severity alert user restricted from sending email": 10,

        "spam": 1,
        "phishing": 1,
        "scam": 1,
        "scam email": 1,
        "security": 0.5,

        "security cameras": 1.5,
        "security camera": 1.5,
        "camera": 0.5,
        "elevator": 0.5,
    },

    // Server
    1003: {
        "server": 0.5,
        "bounced": 1
    },

    // Canvas
    1005: {
        "webassign": 1,
        "kaltura": 1,
        "katura": 1,
        "cultura": 1,
        "redshelf": 1,
        "red shelf": 1,
        "mymedia": 1,
        "canvas": 1,
        "blueprint course": 1
    },

    // O365
    1010: {
        "onedrive": 1,
        "one drive": 1,
        "storage": 0.5,

        "office 365": 1,
        "sharepoint": 1,

        "microsoft office": 1,
        "microsoft word": 1,
        "microsoft access": 1,
        "microsoft project": 1,
        "microsoft publisher": 1,

        "team": 0.5,
        "teams": 0.5,
        "excel": 0.5,
        "powerpoint": 0.5,
        "visio": 0.5,
        "calendar": 0.5,

        "mailmerge": 1,
        "mail merge": 1,
        "email": 0.5,
        "emails": 0.5,
        "outlook": 0.5,
        "get outlook for ios": -0.5, // Negative weight to reduce false positives
    },

    // Alumni
    3415: {
        "alumni": 2,
        "graduate": 1,
        "graduated": 1,

        "proofpoint": 1,
        "required security steps": 1,
        "security training": 1,
        "it training": 1,
        "training": 0.5,

        "locked": 0.5,
        "blocked": 0.5,
        "disabled": 0.5,
        "account block": 1,
        "deactivated": 1.5,
        "deleted account": 1.5,
        "delete account": 1.5,
    }
};