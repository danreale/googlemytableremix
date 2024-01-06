import {
  Link,
  useLoaderData,
  useFetcher,
  useSearchParams,
  Form,
} from "@remix-run/react";
import { type LoaderFunctionArgs, type ActionFunctionArgs, redirect } from "@remix-run/node";
import { FaCheck, FaTrash } from "react-icons/fa/index.js";
import { deletePlayer, getPlayerCount, getPlayers, type PLAYERROW } from "~/data/googlemytable.server";


export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export default function Index() {
  const [params] = useSearchParams();
  const fetcher = useFetcher();
  const { playerCount, players } = useLoaderData<typeof loader>();
  const playersCountZero = playerCount === 0 ? true : false;
  function deleteItemHandler(id: any) {
    const proceed = confirm("Are you sure you want to delete this player?");

    if (!proceed) {
      return;
    }
    fetcher.submit(
      {
        id,
      },
      {
        method: "delete",
      }
    );

    if (fetcher.state !== "idle") {
      return (
        <article>
          <p>Deleting Player...</p>
        </article>
      );
    }
  }
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer noopener"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer noopener"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer noopener"
          >
            Remix Docs
          </a>
        </li>
      </ul>
      <h1 className="text-2xl text-center py-2">Players</h1>
      <div className="flex justify-center items-center text-center text-xl space-x-1 py-5">
        <p>Players Count:</p>
        <p className="text-red-500" data-testid="keywordCount">
          {playerCount}
        </p>
      </div>
      <div className="flex justify-center items-center text-center pt-2">
        <Form>
          <input
            type="text"
            name="query"
            placeholder="Search Players..."
            defaultValue={params.get("query") || ""}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-2 border-white rounded"
            data-testid="keywordSearch"
          />
        </Form>
      </div>
      <div>
        {playersCountZero && (
          <p className="text-2xl text-center py-2">
            Add Some Players Today
          </p>
        )}
        {!playersCountZero && (
          <div>
            <ul
              className="text-center py-5"
              data-testid="playersList"
            >
              {players.map((player: PLAYERROW, index: number) => (
                <li
                  key={index}
                  className="flex justify-center text-center items-center space-x-5 py-2"
                  data-testid="playersRow"
                >
                  <label htmlFor="" data-testid="player" className="flex">
                    {player.firstName} {player.lastName} {player.professional && <FaCheck className="text-green-600"/>}
                  </label>
                  <button
                    className="text-red-500"
                    onClick={() => deleteItemHandler(player.id)}
                    data-testid="deleteKeyword"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const playerCount = await getPlayerCount();

  const players = await getPlayers(search.get("query"));

  return { playerCount, players };
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const formDataData = Object.fromEntries(formData);
    await deletePlayer(formDataData.id);
    return redirect("/");
  }
}