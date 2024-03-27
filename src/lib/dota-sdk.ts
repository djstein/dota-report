import type {
  Player,
  ProPlayer,
  Team,
  TeamPlayerAssociation,
} from "@/types/dota";

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

export async function getProPlayers(): Promise<ProPlayer[]> {
  const proPlayersUrl = new URL("/api/proPlayers", BASE_URL);
  let response = await fetcher(proPlayersUrl);
  if (!response.ok) {
    console.error("Failed to fetch proPlayers");
    return [];
  }
  let proPlayers = await response.json();
  proPlayers = proPlayers.sort((a: ProPlayer, b: ProPlayer) => {
    if (Number(a.account_id) > Number(b.account_id)) {
      return 1;
    } else {
      return -1;
    }
  });
  return proPlayers;
}

export async function getTeams(): Promise<Team[]> {
  const teamsUrl = new URL("/api/teams", BASE_URL);
  let response = await fetcher(teamsUrl);
  if (!response.ok) {
    console.error("Failed to fetch teams");
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
  const response = await fetcher(teamUrl);
  if (!response) {
    console.error("Failed to fetch team");
    return undefined;
  }
  let team = (await response.json()) as Team;
  return team;
}

export async function getPlayersForTeam({
  teamId,
}: {
  teamId: string;
}): Promise<Player[]> {
  const playersUrl = new URL(`/api/teams/${teamId}/players`, BASE_URL);
  const response = await fetcher(playersUrl);
  if (!response.ok) {
    console.error("Failed to fetch players for team");
    return [];
  }
  let teamPlayerAssociations =
    (await response.json()) as TeamPlayerAssociation[];
  let players: Player[] = [];
  Promise.all(
    teamPlayerAssociations.map(async (teamPlayerAssociation) => {
      let player = await getPlayer({
        accountId: teamPlayerAssociation.account_id.toString(),
      });
      if (player) {
        players.push(player);
      }
    }),
  );

  return players;
}

export async function getPlayer({
  accountId,
}: {
  accountId: string;
}): Promise<Player | undefined> {
  const playerUrl = new URL(`/api/players/${accountId}`, BASE_URL);
  const response = await fetcher(playerUrl);
  if (!response.ok) {
    console.error("Failed to fetch player");
    return undefined;
  }
  let player = (await response.json()) as Player;
  return player;
}
