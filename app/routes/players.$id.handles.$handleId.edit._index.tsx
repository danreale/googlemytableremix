import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
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
      <h1>Edit Player Handle Page</h1>
      <EditPlayerHandleForm handle={handle} />
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
