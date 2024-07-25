interface LeaderboardEntry {
    id: number;
    name: string;
    points: number;
    created_at: string;
}

type NewLeaderboardEntry = Omit<LeaderboardEntry, 'id' | 'fecha'>;