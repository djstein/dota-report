import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player, Team } from "@/types/dota";
import Image from "next/image";
import PlayersList from "./players-list";

export function TeamDetails({
  team,
  players,
}: {
  team: Team;
  players: Player[];
}) {
  return (
    <div className="w-full flex flex-col gap-4 justify-center align-middle items-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>
            {team.tag} | Rating: {team.rating} Wins: {team.wins} Losses:{" "}
            {team.losses}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {team.logo_url?.length > 0 && (
            <Image
              className="w-full h-full flex justify-center align-middle"
              height={100}
              width={100}
              src={team.logo_url}
              alt={`${team.name} Logo`}
            />
          )}
        </CardContent>
      </Card>
      <PlayersList players={players} />
    </div>
  );
}
