import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { FaIdCard } from "react-icons/fa/index.js";
import BackToPageButton from "~/components/BackToPageButton";
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Search" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Player
          </h2>
        </div>
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
