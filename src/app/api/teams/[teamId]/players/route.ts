import { getPlayersForTeam } from "@/lib/dota-sdk";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(
  _request: NextRequest,
  { params }: { params: { teamId: string } },
) {
  const { teamId } = params;
  try {
    const players = await getPlayersForTeam({ teamId });
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
