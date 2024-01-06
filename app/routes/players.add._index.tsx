
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { PLAYER, addPlayer } from "~/data/googlemytable.server";


export default function Example() {
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
            Add Player
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="professional"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Professional
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="professional"
                  name="professional"
                  type="checkbox"
                  autoComplete="professional"
                  className=""
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
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const playerData = Object.fromEntries(formData);
    console.log(playerData)
    if (playerData.firstName.toString().length === 0) {
      return "Did not enter a valid First Name";
    }
    if (playerData.lastName.toString().length === 0) {
        return "Did not enter a valid Last Name";
      }
  
    try {
      const newPlayer: PLAYER = {
        firstName: playerData.firstName.toString(),
        lastName: playerData.lastName.toString(),
        professional: playerData.professional?.toString() === "on" ? true : false
      };
  
      await addPlayer(newPlayer);
      return redirect("/");
    } catch (error) {
      throw new Error("Cant add Player");
    }
  }