import { Form, useActionData, useNavigation } from "@remix-run/react";
import {
  redirect,
  type ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  HANDLE,
  PLAYER,
  addPlayer,
  addPlayerHandleV2,
} from "~/data/googlemytable.server";
import { pokerSites } from "~/data/pokerSites";
import AddPlayerHandleForm from "~/components/AddPlayerHandle";
import BackToPageButton from "~/components/BackToPageButton";

export default function AddHandle() {
  const actionData = useActionData<typeof action>();
  const transition = useNavigation();
  const buttonText =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? "Saved!"
      : "Add";
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
        <BackToPageButton text="Back To Player Handles" />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Player Handle
          </h2>
        </div>

        <AddPlayerHandleForm />
        {actionData ? <p style={{ color: "red" }}>{actionData}</p> : null}
      </div>
    </>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const playerId = params.id;
  const formData = await request.formData();
  const handleData = Object.fromEntries(formData);
  console.log(handleData);
  if (handleData.handle.toString().length === 0) {
    return "Did not enter a valid player Handle";
  }

  try {
    const playerHandle: HANDLE = {
      site: handleData.site.toString(),
      handle: handleData.handle.toString(),
      playerId: playerId!!,
    };

    await addPlayerHandleV2(playerHandle);
    return redirect(`/players/${playerId}/handles`);
  } catch (error) {
    throw new Error("Cant add player handle");
  }
}
