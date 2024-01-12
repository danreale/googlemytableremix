import {
  Link,
  useLoaderData,
  useFetcher,
  useSearchParams,
  Form,
  useActionData,
} from "@remix-run/react";
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { FaCheck, FaCrown, FaTrash, FaUserPlus } from "react-icons/fa/index.js";
import {
  deletePlayer,
  deletePlayerV2,
  getPlayerCount,
  getPlayers,
  getPlayersCountV2,
  getPlayersV2,
  type PLAYERROW,
} from "~/data/googlemytable.server";
import PlayersList from "~/components/PlayersList";
import NavigationHeader from "~/components/Header";

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
  const actionData = useActionData<typeof action>();
  const [params] = useSearchParams();
  const { playerCount, players } = useLoaderData<typeof loader>();
  const playersCountZero = playerCount.aggs.totalCount === 0 ? true : false;

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {/* <Link to="/">
        <FaCrown className="mx-auto h-10 w-auto text-green-700" />
      </Link> */}
      <NavigationHeader />
      <h1 className="text-2xl text-center py-2">Players</h1>
      <div className="flex justify-center items-center text-center text-xl space-x-1 py-5">
        <p>Players Count:</p>
        <p className="text-red-500" data-testid="keywordCount">
          {playerCount.aggs.totalCount}
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
            <Link to="/players/add">Add Some Players Today!</Link>
          </p>
        )}
        <div className="py-5 flex justify-center text-center space-x-1">
          <Link to="/players/add" className=" underline text-blue-700">
            Add Player
          </Link>
          <FaUserPlus className="text-blue-700" />
        </div>

        {!playersCountZero && <PlayersList players={players} />}
      </div>
      <div>
        <p>{actionData}</p>
      </div>
    </main>
  );
}
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  // const playerCount = await getPlayerCount();

  // const players = await getPlayers(search.get("query"));

  const playerCount = await getPlayersCountV2();
  console.log(playerCount);

  const players = await getPlayersV2();
  console.log(players);

  return { playerCount, players };
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const formDataData = Object.fromEntries(formData);
    // await deletePlayer(formDataData.id);
    try {
      await deletePlayerV2(formDataData.id.toString());
    } catch (error) {
      return "Unable to delete player";
    }
    return redirect("/");
  }
}
