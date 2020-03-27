import { SearchItem } from './search-item.model';
export interface SearchResponse {
    keyword?: string;
    searchItems?: SearchItem[];
    filters?: FilterData[];
}

export interface FilterData {
    key?: string;
    options?: FilterOption[];
}

export interface FilterOption {
    value?: string;
    count?: number;
}