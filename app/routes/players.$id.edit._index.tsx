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
  formatHandle,
  formatName,
  getPlayerById,
  updatePlayerV3,
} from "~/data/googlemytable.server";
import { POKERSITE, pokerSites } from "~/data/pokerSites";

export default function EditPlayer() {
  const player = useLoaderData<typeof loader>();
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

export async function loader({ params }: LoaderFunctionArgs) {
  const playerId = params.id;

  const player = getPlayerById(playerId);
  return player;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const playerId = params.id;
  const formData = await request.formData();
  const playerData = Object.fromEntries(formData);
  // console.log(playerData);
  if (playerData.first_name.toString().length === 0) {
    return "Did not enter a valid First Name";
  }
  if (playerData.last_name.toString().length === 0) {
    return "Did not enter a valid Last Name";
  }

  const pokerSiteHandles = () => {
    let siteHandles: any = {};
    pokerSites.forEach((site: POKERSITE) => {
      siteHandles[site.id] = formatHandle(playerData[site.id].toString());
    });
    return siteHandles;
  };

  try {
    const newPlayer: PLAYER = {
      first_name: formatName(playerData.first_name.toString()),
      last_name: formatName(playerData.last_name.toString()),
      professional: playerData.professional?.toString() === "on" ? true : false,
      //   site_wsop: formatHandle(playerData.site_wsop.toString()),
      //   site_acr: formatHandle(playerData.site_acr.toString()),
      //   site_party_poker: formatHandle(playerData.site_party_poker.toString()),
      //   site_gg_poker: formatHandle(playerData.site_gg_poker.toString()),
      //   site_888: formatHandle(playerData.site_888.toString()),
      //   site_poker_stars: formatHandle(playerData.site_poker_stars.toString()),
      //   site_borgata: formatHandle(playerData.site_borgata.toString()),
      //   site_bet_mgm: formatHandle(playerData.site_bet_mgm.toString()),
      //   site_pala: formatHandle(playerData.site_pala.toString()),
      //   site_wpt_global: formatHandle(playerData.site_wpt_global.toString()),
      ...pokerSiteHandles(),
    };
    // console.log(newPlayer);

    // await addPlayer(newPlayer);
    await updatePlayerV3(playerId!!, newPlayer);
    return redirect("/");
  } catch (error) {
    return "Cant Update Player";
  }
}
