import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import BackToPageButton from "~/components/BackToPageButton";
import EditPlayerFormV2 from "~/components/EditPlayerFormV2";
import {
  PLAYER,
  getPlayerById,
  updatePlayerV3,
} from "~/data/googlemytable.server";

export default function EditPlayer() {
  const player = useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Search" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Player
          </h2>
        </div>
        <EditPlayerFormV2 player={player} />
      </div>
    </>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const playerId = params.id;

  const player = getPlayerById(playerId);
  return player;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const playerId = params.id;
  const formData = await request.formData();
  const playerData = Object.fromEntries(formData);
  console.log(playerData);
  if (playerData.first_name.toString().length === 0) {
    return "Did not enter a valid First Name";
  }
  if (playerData.last_name.toString().length === 0) {
    return "Did not enter a valid Last Name";
  }

  try {
    const newPlayer: PLAYER = {
      first_name: playerData.first_name.toString(),
      last_name: playerData.last_name.toString(),
      professional: playerData.professional?.toString() === "on" ? true : false,
      site_wsop: playerData.site_wsop.toString(),
      site_acr: playerData.site_acr.toString(),
      site_party_poker: playerData.site_party_poker.toString(),
      site_gg_poker: playerData.site_gg_poker.toString(),
      site_888: playerData.site_888.toString(),
      site_poker_stars: playerData.site_poker_stars.toString(),
      site_borgata: playerData.site_borgata.toString(),
      site_bet_mgm: playerData.site_bet_mgm.toString(),
      site_pala: playerData.site_pala.toString(),
      site_wpt_global: playerData.site_wpt_global.toString(),
    };
    console.log(newPlayer);

    // await addPlayer(newPlayer);
    await updatePlayerV3(playerId!!, newPlayer);
    return redirect("/");
  } catch (error) {
    return "Cant Update Player";
  }
}
