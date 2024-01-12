import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { FaIdCard } from "react-icons/fa/index.js";
import HandlesList from "~/components/HandlesList";
import {
  deletePlayerHandleV2,
  getHandlesV2,
} from "~/data/googlemytable.server";

export default function PlayerHandles() {
  const playerHandles = useLoaderData<typeof loader>();
  return (
    <>
      <h1>Player Handles Page</h1>
      <div className="flex justify-center space-x-1">
        <Link to="add" className="underline text-blue-700">
          Add Player Handle
        </Link>
        <FaIdCard className="text-blue-700" />
      </div>

      <HandlesList handles={playerHandles} />
    </>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const playerId = params.id;

  const playerHandles = await getHandlesV2(playerId);
  console.log(playerHandles);
  return playerHandles;
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const formDataData = Object.fromEntries(formData);
    // await deletePlayer(formDataData.id);
    try {
      await deletePlayerHandleV2(formDataData.id.toString());
    } catch (error) {
      return "Unable to delete player handle";
    }
    return redirect(`/players/${params.id}/handles`);
  }
}
