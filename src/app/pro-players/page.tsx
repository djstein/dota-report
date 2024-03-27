import ProPlayersList from "@/components/pro-players-list";
import { getProPlayers } from "@/lib/dota-sdk";

export default async function ProPlayersPage() {
  const proPlayers = await getProPlayers();
  return <ProPlayersList proPlayers={proPlayers} />;
}
