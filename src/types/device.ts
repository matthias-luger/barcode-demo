export interface Device {
    id: string
    name: string
    description: string
    constructionSite: string
    history: HistoryEntry[]
}

export interface HistoryEntry {
    uuid: string
    date: string
    type: string
    description: string
}
