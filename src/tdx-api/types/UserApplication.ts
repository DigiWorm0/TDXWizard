export default interface UserApplication {
    SecurityRoleId?: string;
    SecurityRoleName?: string;
    IsAdministrator: boolean;
    ID: number;
    Name: string;
    Description: string;
    SystemClass: string;
    IsDefault: boolean;
    IsActive: boolean;
}