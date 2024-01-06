import { prisma } from "./db.server";
import { json } from "@remix-run/node";

export interface PLAYER {
  firstName: string;
  lastName: string;
  professional: boolean;
}

export interface PLAYERROW {
  id: string;
  firstName: string;
  lastName: string;
  professional: boolean;
}

export async function addPlayer(playerData: PLAYER) {
  const playerExists = await prisma.players.findFirst({
    where: { firstName: playerData.firstName, lastName: playerData.lastName },
  });
  if (playerExists) {
    throw new Error("Player already exists");
  } else {
    const newPlayer = await prisma.players.create({
      data: {
        ...playerData,
      },
    });
    if (!newPlayer) {
      return json(
        {
          error: `Something went wrong trying to add a player.`,
        },
        { status: 400 }
      );
    }
  }
}

export async function getPlayerCount() {
  const playerCount = await prisma.players.count();
  return playerCount;
}
export async function getPlayers(searchTerm: string | null) {
  const query = !searchTerm ? {} : { lastName: { contains: searchTerm } };
  try {
    const keywords = await prisma.players.findMany({
      where: query,
      orderBy: { lastName: "asc" },
    });
    return keywords;
  } catch (error) {
    throw new Error("Failed to get players");
  }
}

export async function deletePlayer(id: any) {
  try {
    const player = await prisma.players.delete({
      where: { id },
    });
    return player;
  } catch (error) {
    throw new Error("Failed to delete player");
  }
}
