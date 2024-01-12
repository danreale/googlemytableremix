import { Form } from "@remix-run/react";
import FormTextField from "./FormTextField";
import SubmitButton from "./SubmitButton";

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

          <FormTextField label="WSOP" id="site_wsop" />
          <FormTextField label="Americas Card Room (ACR)" id="site_acr" />
          <FormTextField label="Party Poker" id="site_party_poker" />
          <FormTextField label="GG Poker" id="site_gg_poker" />
          <FormTextField label="888" id="site_888" />
          <FormTextField label="Poker Stars" id="site_poker_stars" />
          <FormTextField label="Borgata" id="site_borgata" />
          <FormTextField label="Bet MGM" id="site_bet_mgm" />
          <FormTextField label="Pala" id="site_pala" />
          <FormTextField label="WPT Global" id="site_wpt_global" />

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
