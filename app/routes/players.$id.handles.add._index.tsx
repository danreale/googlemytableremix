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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Player Handle
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="site"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Site
                </label>
              </div>
              <div className="mt-2">
                <select
                  id="site"
                  name="site"
                  className="border-2 border-green-700 rounded text-center w-80"
                  required
                >
                  {pokerSites.map((site: string, index: number) => {
                    return (
                      <option key={index} value={site}>
                        {site}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="handle"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Handle
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="handle"
                  name="handle"
                  type="text"
                  autoComplete="handle"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {buttonText}
              </button>
              {actionData ? <p style={{ color: "red" }}>{actionData}</p> : null}
            </div>
          </Form>
        </div>
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
