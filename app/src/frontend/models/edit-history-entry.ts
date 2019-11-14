export interface EditHistoryEntry {
    date_trunc: string;
    username: string;
    revision_id: string;
    forward_patch: object;
    reverse_patch: object;
    building_id?: number;
}
