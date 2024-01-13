import { useActionData } from "@remix-run/react";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import {
  PLAYER,
  addPlayerV3,
  formatHandle,
  formatName,
} from "~/data/googlemytable.server";
import BackToPageButton from "~/components/BackToPageButton";
import AddPlayerFormV2 from "~/components/AddPlayerFormV2";
import { POKERSITE, pokerSites } from "~/data/pokerSites";

export default function AddPlayer() {
  const actionData = useActionData<typeof action>();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Search" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Player
          </h2>
        </div>

        <AddPlayerFormV2 />
        <div className="flex justify-center py-2">
          {actionData ? <p style={{ color: "red" }}>{actionData}</p> : null}
        </div>
      </div>
    </>
  );
}
export async function action({ request }: ActionFunctionArgs) {
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
      // site_wsop: formatHandle(playerData.site_wsop.toString()),
      // site_acr: formatHandle(playerData.site_acr.toString()),
      // site_party_poker: formatHandle(playerData.site_party_poker.toString()),
      // site_gg_poker: formatHandle(playerData.site_gg_poker.toString()),
      // site_888: formatHandle(playerData.site_888.toString()),
      // site_poker_stars: formatHandle(playerData.site_poker_stars.toString()),
      // site_borgata: formatHandle(playerData.site_borgata.toString()),
      // site_bet_mgm: formatHandle(playerData.site_bet_mgm.toString()),
      // site_pala: formatHandle(playerData.site_pala.toString()),
      // site_wpt_global: formatHandle(playerData.site_wpt_global.toString()),
      ...pokerSiteHandles(),
    };
    // console.log(`New Player`, newPlayer);

    // await addPlayer(newPlayer);
    await addPlayerV3(newPlayer);
    return redirect("/");
  } catch (error) {
    return "Cant Add Player";
  }
}
