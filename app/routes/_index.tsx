import {
  Link,
  useLoaderData,
  useSearchParams,
  Form,
  useActionData,
} from "@remix-run/react";
import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import { FaFrown, FaUserPlus } from "react-icons/fa/index.js";
import {
  deletePlayerV2,
  getPlayersCountV2,
  searchPlayersByNameV2,
  searchPlayersByHandleV2,
  getPlayersV3,
  formatName,
  formatHandle,
} from "~/data/googlemytable.server";
import PlayersList from "~/components/PlayersList";
import NavigationHeader from "~/components/Header";
import { POKERSITE, pokerSites } from "~/data/pokerSites";
import { useState } from "react";

export default function Index() {
  const actionData = useActionData<typeof action>();
  const [params] = useSearchParams();
  const { playerCount, players } = useLoaderData<typeof loader>();
  const playersCountZero = playerCount.aggs.totalCount === 0 ? true : false;
  const [isOpen, setIsOpen] = useState(true);
  const [toggleText, setToggleText] = useState("Search By Name");
  const [searchParams, setSearchParams] = useSearchParams();

  const removeQueryParamsName = () => {
    // 👇️ delete each query param
    searchParams.delete("first_name");
    searchParams.delete("last_name");
    searchParams.delete("searchType");
    setSearchParams(searchParams);
  };

  const removeQueryParamsHandle = () => {
    // 👇️ delete each query param
    searchParams.delete("searchType");
    searchParams.delete("site");
    searchParams.delete("query");
    // 👇️ update state after
    setSearchParams(searchParams);
  };

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
    setToggleText(isOpen ? "Search By Handle" : "Search By Name");
  }

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <NavigationHeader />
      <div className="flex justify-center items-center text-center text-xl space-x-1 py-5">
        <p>Player Count:</p>
        <p className="text-red-500" data-testid="keywordCount">
          {playerCount.aggs.totalCount}
        </p>
      </div>
      <div className="flex justify-center py-5">
        <button
          onClick={toggle}
          className="border-4 border-green-700 rounded-xl px-2"
        >
          Switch To {toggleText}
        </button>
      </div>
      <div className="flex justify-center items-center text-center pt-2">
        <Form>
          {isOpen && (
            <>
              <input
                type="text"
                name="searchType"
                id="searchType"
                hidden
                value="handleSearch"
              />
              <div className="flex items-center justify-center">
                <label
                  htmlFor="site"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Choose Site
                </label>
              </div>
              <div className="mt-2 pb-5">
                <select
                  id="site"
                  name="site"
                  className="border-2 border-green-700 rounded text-center w-80"
                  required
                >
                  {pokerSites.map((site: POKERSITE, index: number) => {
                    return (
                      <option key={index} value={site.id}>
                        {site.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <input
                type="text"
                name="query"
                placeholder="Search Player Handle"
                defaultValue={params.get("query") || ""}
                className="border-4 border-blue-500 rounded pl-2"
                data-testid="handleSearch"
              />
              <div className="py-5">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Search
                </button>
              </div>
              <div className="pb-5">
                <button
                  type="reset"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={removeQueryParamsHandle}
                >
                  Clear
                </button>
              </div>
            </>
          )}
          {!isOpen && (
            <>
              <input
                type="text"
                name="searchType"
                id="searchType"
                hidden
                value="nameSearch"
              />
              <div>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Player First Name"
                  defaultValue={params.get("first_name") || ""}
                  className="border-4 border-blue-500 rounded pl-2"
                  data-testid="first_name_search"
                />
              </div>
              <div className="py-5">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Player Last Name"
                  defaultValue={params.get("last_name") || ""}
                  className="border-4 border-blue-500 rounded pl-2"
                  data-testid="last_name_search"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
              <div className="py-5">
                <button
                  type="reset"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={removeQueryParamsName}
                >
                  Clear
                </button>
              </div>
            </>
          )}
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
            <FaUserPlus className="text-blue-700 text-2xl" />
          </Link>
        </div>

        {players.length !== 0 && <PlayersList players={players} />}
        {players.length === 0 && (
          <p className="text-2xl text-center py-2 flex justify-center items-center">
            <Link
              to="/players/add"
              className="flex justify-center items-center"
            >
              No Players Found <FaFrown className="text-green-700" />
            </Link>
          </p>
        )}
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
  // console.log(playerCount);

  let players;
  if (search.get("searchType") === "nameSearch") {
    players = await searchPlayersByNameV2(
      formatName(search.get("first_name")),
      formatName(search.get("last_name"))
    );
    console.log(players);
  } else if (search.get("searchType") === "handleSearch") {
    players = await searchPlayersByHandleV2(
      search.get("site"),
      formatHandle(search.get("query"))
    );
    // console.log("Practice Search", practiceSearch);
  } else {
    players = await getPlayersV3();
  }

  // const fakeSearch = await searchPlayersByHandleV2(search.get("query"));
  // console.log(`Fake Search`, fakeSearch);
  // console.log(fakeSearch.records);

  return { playerCount, players };
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const formDataData = Object.fromEntries(formData);
    try {
      await deletePlayerV2(formDataData.id.toString());
    } catch (error) {
      return "Unable to delete player";
    }
    return redirect("/");
  }
}
