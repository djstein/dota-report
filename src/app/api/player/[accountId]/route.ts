import { getPlayer } from "@/lib/dota-sdk";
import { type NextRequest, NextResponse } from "next/server";
export async function GET(
  _request: NextRequest,
  { params }: { params: { accountId: string } },
) {
  const { accountId } = params;
  try {
    const player = await getPlayer({ accountId });
    return NextResponse.json(player, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
