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
import { ProPlayer } from "@/types/dota";
import { useRouter } from "next/navigation";

export default function ProPlayersList({
  proPlayers,
}: {
  proPlayers: ProPlayer[];
}) {
  const router = useRouter();

  if (proPlayers?.length === 0) {
    return <div>No pro players found</div>;
  }
  return (
    <Table>
      <TableCaption>Pro Players</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Account ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Team ID</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>Team Tag</TableHead>
          <TableHead>Steam ID</TableHead>
          <TableHead>Profile URL</TableHead>
          <TableHead>Persona Name</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Full History Time</TableHead>
          <TableHead>Cheese</TableHead>
          <TableHead>FH Unavailable</TableHead>
          <TableHead>Location Country Code</TableHead>
          <TableHead>Country Code</TableHead>
          <TableHead>Fantasy Role</TableHead>
          <TableHead>Is Locked</TableHead>
          <TableHead>Is Pro</TableHead>
          <TableHead>Locked Until</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proPlayers?.map((proPlayer) => (
          <TableRow key={proPlayer.account_id}>
            <TableCell>{proPlayer.account_id}</TableCell>
            <TableCell>{proPlayer.name}</TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => router.push(`/teams/${proPlayer.team_id}`)}
            >
              {proPlayer.team_id}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => router.push(`/teams/${proPlayer.team_id}`)}
            >
              {proPlayer.team_name}
            </TableCell>
            <TableCell
              className="cursor-pointer"
              onClick={() => router.push(`/teams/${proPlayer.team_id}`)}
            >
              {proPlayer.team_tag}
            </TableCell>
            <TableCell>{proPlayer.steamid}</TableCell>
            <TableCell>{proPlayer.profileurl}</TableCell>
            <TableCell>{proPlayer.personaname}</TableCell>
            <TableCell>{proPlayer.last_login}</TableCell>
            <TableCell>{proPlayer.full_history_time}</TableCell>
            <TableCell>{proPlayer.cheese}</TableCell>
            <TableCell>{proPlayer.fh_unavailable}</TableCell>
            <TableCell>{proPlayer.loccountrycode}</TableCell>
            <TableCell>{proPlayer.country_code}</TableCell>
            <TableCell>{proPlayer.fantasy_role}</TableCell>
            <TableCell>{proPlayer.is_locked}</TableCell>
            <TableCell>{proPlayer.is_pro}</TableCell>
            <TableCell>{proPlayer.locked_until}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
