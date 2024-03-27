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
import { Player } from "@/types/dota";

export default function PlayersList({ players }: { players: Player[] }) {
  if (players?.length === 0) {
    return <div>No players found</div>;
  }
  return (
    <Table>
      <TableCaption>Players</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Account ID</TableHead>
          <TableHead className="w-[100px]">Persona Name</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Solo Rank</TableHead>
          <TableHead>Competitive Rank</TableHead>
          <TableHead>Rank Tier</TableHead>
          <TableHead>Leaderboard Rank</TableHead>
          <TableHead>Plus</TableHead>
          <TableHead>Cheese</TableHead>
          <TableHead>Steam ID</TableHead>
          <TableHead>Country Code</TableHead>
          <TableHead>Is Contributor</TableHead>
          <TableHead>Is Subscriber</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.map((player) => (
          <TableRow key={player.profile.account_id}>
            <TableCell>{player.profile.account_id}</TableCell>
            <TableCell className="font-medium">
              {player.profile.personaname}
            </TableCell>
            <TableCell>{player.profile.name}</TableCell>
            <TableCell>{player.solo_competitive_rank}</TableCell>
            <TableCell>{player.competitive_rank}</TableCell>
            <TableCell>{player.rank_tier}</TableCell>
            <TableCell>{player.leaderboard_rank}</TableCell>
            <TableCell>{player.profile.plus}</TableCell>
            <TableCell>{player.profile.cheese}</TableCell>
            <TableCell>{player.profile.steamid}</TableCell>
            <TableCell>{player.profile.loccountrycode}</TableCell>
            <TableCell>{player.profile.is_contributor}</TableCell>
            <TableCell>{player.profile.is_subscriber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
