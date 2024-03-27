import { TeamDetails } from "@/components/team-details";
import { getTeam } from "@/lib/dota-sdk";

export default async function Team({ params }: { params: { teamId: string } }) {
  const { teamId } = params;
  const team = await getTeam({ teamId: teamId?.toString() ?? "" });
  return (
    <main className="w-full h-full">
      {team ? (
        <TeamDetails team={team} />
      ) : (
        <h1>Team not found for {teamId}</h1>
      )}
    </main>
  );
}
