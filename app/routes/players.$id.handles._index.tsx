import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import {
  FaArrowCircleLeft,
  FaBackward,
  FaIdCard,
} from "react-icons/fa/index.js";
import BackToPageButton from "~/components/BackToPageButton";
import HandlesList from "~/components/HandlesList";
import {
  deletePlayerHandleV2,
  getHandlesV2,
  getPlayerById,
} from "~/data/googlemytable.server";

export default function PlayerHandles() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { playerHandles, playerInfo } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Info" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {playerInfo?.first_name} {playerInfo?.last_name}'s Player Handles
          </h2>
        </div>
      </div>

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
  const playerInfo = await getPlayerById(playerId);
  return { playerHandles, playerInfo };
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
