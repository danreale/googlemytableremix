import { Form } from "@remix-run/react";
import FormTextField from "./FormTextField";
import SubmitButton from "./SubmitButton";
import { pokerSites } from "~/data/pokerSites";

export default function AddPlayerForm() {
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form className="space-y-6" method="POST">
          <FormTextField label="First Name" id="first_name" required />
          <FormTextField label="Last Name" id="last_name" required />
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

          {pokerSites.map((site: any, index: number) => (
            <FormTextField label={site.label} id={site.id} key={index} />
          ))}
          <SubmitButton
            defaultText="Add"
            submittingText="Saving..."
            loadedText="Saved!"
          />
        </Form>
      </div>
    </>
  );
}
