import {SearchType} from "./SearchType";

export default interface AutoDetectSearchType {
    type: SearchType;
    regexes: string[];
    appID?: number;
}