import {SearchType} from "./SearchType";

export default interface SearchHistoryItem {
    text: string;
    href: string;
    type?: SearchType;
}