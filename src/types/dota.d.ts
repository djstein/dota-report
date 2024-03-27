export interface ProPlayer {
  account_id: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  personaname: string;
  last_login: string;
  full_history_time: string;
  cheese: number;
  fh_unavailable: boolean;
  loccountrycode: string;
  name: string;
  country_code: string;
  fantasy_role: number;
  team_id: number;
  team_name: string;
  team_tag: string;
  is_locked: boolean;
  is_pro: boolean;
  locked_until: number;
}

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

export interface PlayerOutput {
  personaName: string;
  experience: number;
  countryCode: string;
}

export interface TeamPlayerAssociation {
  account_id: number;
  name: string | null;
  games_played: number;
  wins: number;
  is_current_team_member: boolean | null;
}

export interface Player {
  solo_competitive_rank: number;
  competitive_rank: number;
  rank_tier: number;
  leaderboard_rank: number;
  profile: Profile;
}

export interface Profile {
  account_id: number;
  personaname: string;
  name: string;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string;
  loccountrycode: string;
  is_contributor: boolean;
  is_subscriber: boolean;
}
