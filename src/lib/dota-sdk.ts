import type { Player, Team } from "@/types/dota";

const BASE_URL = "https://api.opendota.com/";

export type Fetcher = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

export function serverFetch() {
  const fetcher: Fetcher = async (
    input: string | URL | globalThis.Request,
    init: RequestInit = {},
  ): Promise<Response> => {
    const options = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (init.headers) {
      init.headers = {
        ...options.headers,
        ...init.headers,
      };
    }
    Object.assign(init, options);
    return fetch(input, init);
  };
  return fetcher;
}

const fetcher = serverFetch();

export async function getTeams(): Promise<Team[]> {
  const teamsUrl = new URL("/api/teams", BASE_URL);
  let response = await fetcher(teamsUrl);
  if (!response.ok) {
    return [];
  }
  let teams = await response.json();
  teams = teams.sort((a: Team, b: Team) => {
    if (Number(a.team_id) > Number(b.team_id)) {
      return 1;
    } else {
      return -1;
    }
  });
  return teams;
}

export async function getTeam({
  teamId,
}: {
  teamId: string;
}): Promise<Team | undefined> {
  const teamUrl = new URL(`/api/teams/${teamId}`, BASE_URL);
  const response = await fetcher(teamUrl).then((res) => res.json());
  if (!response) {
    return undefined;
  }
  const team = response as Team;
  return team;
}

export async function getPlayersForTeam({
  teamId,
}: {
  teamId: string;
}): Promise<Player[]> {
  const playersUrl = new URL(`/api/teams/${teamId}/players`, BASE_URL);
  const response = await fetcher(playersUrl).then((res) => res.json());
  if (!response.ok) {
    return [];
  }
  const players = response as Player[];
  return players;
}

export async function getPlayer({
  accountId,
}: {
  accountId: string;
}): Promise<Player | undefined> {
  const playerUrl = new URL(`/api/players/${accountId}`, BASE_URL);
  const response = await fetcher(playerUrl).then((res) => res.json());
  if (!response.ok) {
    return undefined;
  }
  const player = response as Player;
  return player;
}
