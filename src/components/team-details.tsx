import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "@/types/dota";
import Image from "next/image";

export function TeamDetails({ team }: { team: Team }) {
  return (
    <div className="w-full flex justify-center align-middle">
      <Card>
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
    </div>
  );
}
