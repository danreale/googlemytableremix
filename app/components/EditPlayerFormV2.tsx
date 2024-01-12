import { Form } from "@remix-run/react";
import FormTextField from "./FormTextField";
import SubmitButton from "./SubmitButton";

export default function EditPlayerForm({ player }: { player: any }) {
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form className="space-y-6" method="POST">
          <FormTextField
            label="First Name"
            id="first_name"
            required
            defaultValue={player.first_name}
          />
          <FormTextField
            label="Last Name"
            id="last_name"
            required
            defaultValue={player.last_name}
          />

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
                defaultChecked={player.professional}
              />
            </div>
          </div>

          <FormTextField
            label="WSOP"
            id="site_wsop"
            defaultValue={player.site_wsop}
          />
          <FormTextField
            label="Americas Card Room (ACR)"
            id="site_acr"
            defaultValue={player.site_acr}
          />
          <FormTextField
            label="Party Poker"
            id="site_party_poker"
            defaultValue={player.site_party_poker}
          />
          <FormTextField
            label="GG Poker"
            id="site_gg_poker"
            defaultValue={player.site_gg_poker}
          />
          <FormTextField
            label="888"
            id="site_888"
            defaultValue={player.site_888}
          />
          <FormTextField
            label="Poker Stars"
            id="site_poker_stars"
            defaultValue={player.site_poker_stars}
          />
          <FormTextField
            label="Borgata"
            id="site_borgata"
            defaultValue={player.site_borgata}
          />
          <FormTextField
            label="Bet MGM"
            id="site_bet_mgm"
            defaultValue={player.site_mgm}
          />
          <FormTextField
            label="Pala"
            id="site_pala"
            defaultValue={player.site_pala}
          />
          <FormTextField
            label="WPT Global"
            id="site_wpt_global"
            defaultValue={player.site_wpt_global}
          />

          <SubmitButton
            defaultText="Update"
            submittingText="Saving..."
            loadedText="Updated!"
          />
        </Form>
      </div>
    </>
  );
}
