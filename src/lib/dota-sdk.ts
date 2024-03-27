import type {
  Player,
  ProPlayer,
  Team,
  TeamPlayerAssociation,
  TeamWithPlayer,
  TeamXPAndPlayerIds,
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

export async function compileTeamsByProPlayers({
  limit,
}: {
  limit?: number;
}): Promise<TeamWithPlayer[]> {
  const proPlayers = await getProPlayers();
  let teamXPAndPlayerIdsObj: {
    [key: string]: TeamXPAndPlayerIds;
  } = {};

  proPlayers.forEach((proPlayer) => {
    if (proPlayer.team_id === undefined || proPlayer.team_id === null) {
      return;
    }
    if (proPlayer.team_id in teamXPAndPlayerIdsObj) {
      const experience = new Date(proPlayer.full_history_time).getTime();
      teamXPAndPlayerIdsObj[proPlayer.team_id].totalExperience += experience;
      teamXPAndPlayerIdsObj[proPlayer.team_id].proPlayers.push({
        personaName: proPlayer.personaname,
        experience: experience,
        countryCode: proPlayer.loccountrycode,
      });
      teamXPAndPlayerIdsObj[proPlayer.team_id].teamId = proPlayer.team_id;
    } else {
      const experience = new Date(proPlayer.full_history_time).getTime();
      teamXPAndPlayerIdsObj[proPlayer.team_id] = {
        teamId: proPlayer.team_id,
        totalExperience: experience,
        proPlayers: [
          {
            personaName: proPlayer.personaname,
            experience: experience,
            countryCode: proPlayer.loccountrycode,
          },
        ],
      };
    }
  });

  let teamsToQuery = Object.values(teamXPAndPlayerIdsObj)
    .sort((a, b) => {
      if (a.totalExperience < b.totalExperience) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, limit);

  let teamsWithPlayers: TeamWithPlayer[] = [];
  await Promise.all(
    teamsToQuery.map(async (team) => {
      let teamObj = await getTeam({ teamId: team.teamId.toString() });
      if (teamObj) {
        teamsWithPlayers.push({
          name: teamObj.name,
          team_id: teamObj.team_id,
          wins: teamObj.wins,
          losses: teamObj.losses,
          rating: teamObj.rating,
          experience: team.totalExperience,
          players: team.proPlayers,
        });
      }
    }),
  );
  return teamsWithPlayers;
}

export async function getTeams({ limit }: { limit?: number }): Promise<Team[]> {
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
  if (limit) {
    teams = teams.slice(0, limit);
  }
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
