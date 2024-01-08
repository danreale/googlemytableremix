import { useLoaderData } from "@remix-run/react";
import {
  getPlayerCount,
  getPlayersCountV2,
  getPlayersV2,
} from "~/data/googlemytable.server";

export default function Index() {
  const players = useLoaderData<typeof loader>();
  return (
    <>
      <div className="w-full max-w-5xl mt-16">
        {players.length === 0 && <p>No blog posts found</p>}
        {players.map((player) => (
          <div key={player.id} className="mb-16">
            <h2 className="text-2xl mb-2">
              <label>
                {player.first_name}
                {player.last_name}
              </label>
            </h2>
            <p className="text-purple-950 dark:text-purple-200 mb-5">
              {player.professional ? "Professional" : "Recreational"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function loader() {
  const players = await getPlayersV2();
  console.log(players);

  const playerCount = await getPlayersCountV2();
  console.log(playerCount);
  return players;
}
