"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Team } from "@/types/dota";
import { useRouter } from "next/navigation";

export default function TeamsClient({ teams }: { teams: Team[] }) {
  const router = useRouter();

  return (
    <main className="w-full h-full">
      <h1 className="font-extrabold text-2xl m-4">Teams</h1>
      <Table>
        <TableCaption>Teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Wins</TableHead>
            <TableHead>Losses</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Last Match Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams?.map((team) => (
            <TableRow
              key={team.team_id}
              onClick={() => router.push(`/teams/${team.team_id}`)}
            >
              <TableCell>{team.team_id}</TableCell>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.tag}</TableCell>
              <TableCell>{team.wins}</TableCell>
              <TableCell>{team.losses}</TableCell>
              <TableCell>{team.rating}</TableCell>
              <TableCell>{team.experience}</TableCell>
              <TableCell>{team.last_match_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
