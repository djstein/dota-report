import TeamsList from "@/components/teams-list";
import { getTeams } from "@/lib/dota-sdk";

export default async function TeamsPage() {
  const teams = await getTeams();
  return <TeamsList teams={teams} />;
}
