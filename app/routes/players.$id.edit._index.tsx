import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { FaIdCard } from "react-icons/fa/index.js";
import EditPlayerForm from "~/components/EditPlayerForm";
import {
  PLAYER,
  getPlayerById,
  updatePlayerV2,
} from "~/data/googlemytable.server";

export default function EditPlayer() {
  const player = useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <>
      <h1>Edit Player</h1>
      <EditPlayerForm player={player} />
      <div className="py-5 flex justify-center text-center space-x-1">
        <Link
          to={`/players/${params.id}/handles`}
          className=" underline text-blue-700"
        >
          Player Handles
        </Link>

        <FaIdCard className="text-blue-700" />
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
  if (playerData.firstName.toString().length === 0) {
    return "Did not enter a valid First Name";
  }
  if (playerData.lastName.toString().length === 0) {
    return "Did not enter a valid Last Name";
  }

  try {
    const newPlayer: PLAYER = {
      first_name: playerData.firstName.toString(),
      last_name: playerData.lastName.toString(),
      professional: playerData.professional?.toString() === "on" ? true : false,
    };
    console.log(newPlayer);

    // await addPlayer(newPlayer);
    await updatePlayerV2(playerId!!, newPlayer);
    return redirect("/");
  } catch (error) {
    return "Cant Update Player";
  }
}
