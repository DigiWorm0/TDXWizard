import {SearchType} from "./SearchType";

export default interface SearchResult {
    text: string;
    historyText?: string;
    href: string;
    type?: SearchType;
}