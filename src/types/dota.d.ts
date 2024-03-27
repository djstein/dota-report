export interface Team {
  name: string;
  team_id: string;
  wins: number;
  losses: number;
  rating: number;
  experience: number;
  players: Player[];
  last_match_time: number;
  logo_url: string;
  tag: string;
}

export interface Player {
  personaName: string;
  experience: number;
  countryCode: string;
}
