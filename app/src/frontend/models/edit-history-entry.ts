export interface EditHistoryEntry {
    revision_timestamp: string;
    username: string;
    revision_id: string;
    forward_patch: object;
    reverse_patch: object;
    building_id?: number;
}
