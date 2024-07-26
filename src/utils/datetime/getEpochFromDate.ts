import DateTime from "../../tdx-api/types/DateTime";

export default function getEpochFromDate(date: DateTime): number {
    return (new Date(date)).getTime();
}