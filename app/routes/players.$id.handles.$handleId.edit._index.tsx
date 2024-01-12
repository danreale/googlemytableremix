import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import BackToPageButton from "~/components/BackToPageButton";
import EditPlayerHandleForm from "~/components/EditPlayerHandleForm";
import {
  HANDLE,
  getPlayerHandleById,
  updateHandleV2,
} from "~/data/googlemytable.server";

export default function EditHandle() {
  const handle = useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Handles" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Player Handle
          </h2>
        </div>
        <EditPlayerHandleForm handle={handle} />
      </div>
    </>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const handleId = params.handleId;

  const player = getPlayerHandleById(handleId);
  return player;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const playerId = params.id;
  const handleId = params.handleId;
  const formData = await request.formData();
  const handleData = Object.fromEntries(formData);
  console.log(handleData);
  if (handleData.handle.toString().length === 0) {
    return "Did not enter a valid handle";
  }

  try {
    const newPlayer: HANDLE = {
      site: handleData.site.toString(),
      handle: handleData.handle.toString(),
      playerId: playerId,
    };
    console.log(newPlayer);

    // await addPlayer(newPlayer);
    await updateHandleV2(handleId!!, newPlayer);
    return redirect(`/players/${playerId}/handles`);
  } catch (error) {
    return "Cant Update Player";
  }
}
