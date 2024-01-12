import { useActionData } from "@remix-run/react";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { PLAYER, addPlayerV2 } from "~/data/googlemytable.server";
import AddPlayerForm from "~/components/AddPlayerForm";
import BackToPageButton from "~/components/BackToPageButton";

export default function Example() {
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

        <AddPlayerForm />
        <div>
          {actionData ? <p style={{ color: "red" }}>{actionData}</p> : null}
        </div>
      </div>
    </>
  );
}
export async function action({ request }: ActionFunctionArgs) {
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
    await addPlayerV2(newPlayer);
    return redirect("/");
  } catch (error) {
    return "Cant Add Player";
  }
}
