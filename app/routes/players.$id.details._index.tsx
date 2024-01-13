import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import BackToPageButton from "~/components/BackToPageButton";
import PlayerDetails from "~/components/PlayerDetails";
import { getPlayerById } from "~/data/googlemytable.server";

export default function EditPlayer() {
  const player = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Search" />
        <PlayerDetails player={player} />
      </div>
    </>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  const playerId = params.id;

  const player = getPlayerById(playerId);
  return player;
}
