import { useLoaderData } from "@remix-run/react";
import { getHandlesV2, getPlayersV2 } from "~/data/googlemytable.server";

export default function Index() {
  const players = useLoaderData<typeof loader>();
  return (
    <>
      <div className="w-full max-w-5xl mt-16">
        {players.length === 0 && <p>No blog posts found</p>}
        {players.map((player) => (
          <div key={player.id} className="mb-16">
            <h2 className="text-2xl mb-2">
              <label>{player.site}</label>
            </h2>
            <h2 className="text-2xl mb-2">
              <label>{player.handle}</label>
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}

export async function loader() {
  const players = await getHandlesV2();
  console.log(players);

  return players;
}
