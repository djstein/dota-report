import { TeamDetails } from "@/components/team-details";
import { getPlayersForTeam, getTeam } from "@/lib/dota-sdk";

export default async function Team({ params }: { params: { teamId: string } }) {
  const { teamId } = params;
  const team = await getTeam({ teamId: teamId?.toString() ?? "" });
  const players = await getPlayersForTeam({ teamId: teamId?.toString() ?? "" });
  return (
    <main className="w-full h-full">
      {team ? (
        <TeamDetails team={team} players={players} />
      ) : (
        <h1>Team not found for {teamId}</h1>
      )}
    </main>
  );
}
