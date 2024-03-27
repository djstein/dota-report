import { getTeam } from "@/lib/dota-sdk";
import Image from "next/image";

export default async function Team({ teamId }: { teamId: string }) {
  const team = await getTeam({ teamId: teamId });
  return (
    <main className="w-full h-full">
      <h1>Teams</h1>

      <div>{team.team_id}</div>
      <div className="font-medium">{team.name ?? "!! NO NAME"}</div>
      <div>{team.wins}</div>
      <div>{team.losses}</div>
      <div>{team.rating}</div>
      <div>{team.experience}</div>
      <div>{team.last_match_time}</div>
      <div>{team.tag}</div>
      <div className="text-right">
        {team.logo_url?.length > 0 && (
          <Image
            height={25}
            width={25}
            src={team.logo_url}
            alt={`${team.name} Logo`}
          />
        )}
      </div>
    </main>
  );
}
