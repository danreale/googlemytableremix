import { prisma } from "./db.server";
import { json } from "@remix-run/node";
import { getXataClient } from "src/xata";

export interface PLAYER {
  first_name: string;
  last_name: string;
  professional: boolean;
  site_wsop: string;
  site_acr: string;
  site_party_poker: string;
  site_gg_poker: string;
  site_888: string;
  site_poker_stars: string;
  site_borgata: string;
  site_bet_mgm: string;
  site_pala: string;
  site_wpt_global: string;
}

export interface PLAYERROW {
  id: string;
  firstName: string;
  lastName: string;
  professional: boolean;
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

export async function getPlayersV2() {
  try {
    const players = await getXataClient().db.players.getAll();
    return players;
  } catch (error) {
    throw new Error("Cant get players");
  }
}
export async function getPlayersCountV2() {
  try {
    const players = await getXataClient().db.players.aggregate({
      totalCount: {
        count: "*",
      },
    });
    return players;
  } catch (error) {
    throw new Error("Cant get player count");
  }
}

export async function deletePlayerV2(id: string) {
  await getXataClient().db.players.delete({ id: id });
}
export async function addPlayerV2(playerData: PLAYER) {
  await getXataClient().db.players.create(playerData);
}

export async function getPlayerById(id: string) {
  const player = await getXataClient().db.players.read(id);
  return player;
}

export async function updatePlayerV2(id: string, playerData: PLAYER) {
  await getXataClient().db.players.update(id, playerData);
}

export async function searchPlayersByNameV2(searchTerm: string) {
  const playerData = await getXataClient().search.all(searchTerm, {
    tables: ["players"],
    fuzziness: 2,
  });
  return playerData;
}

export async function addPlayerV3(playerData: PLAYER) {
  await getXataClient().db.players.create(playerData);
}
export async function updatePlayerV3(id: string, playerData: PLAYER) {
  await getXataClient().db.players.update(id, playerData);
}
