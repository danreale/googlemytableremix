import { Form, useNavigation } from "@remix-run/react";
import { pokerSites } from "~/data/pokerSites";

export default function AddPlayerHandleForm() {
  const transition = useNavigation();
  const buttonText =
    transition.state === "submitting"
      ? "Saving..."
      : transition.state === "loading"
      ? "Updated!"
      : "Update";
  return (
    <>
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
          </div>
        </Form>
      </div>
    </>
  );
}
