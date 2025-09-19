import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { points: "desc" },
      take: 20,
      select: { id: true, username: true, points: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("[LEADERBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
