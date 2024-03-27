import { getTeams } from "@/lib/dota-sdk";
import TeamsClient from "./client";

export default async function TeamsPage() {
  const teams = await getTeams();
  return <TeamsClient teams={teams} />;
}
