// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "players",
    columns: [
      { name: "first_name", type: "string" },
      { name: "last_name", type: "string" },
      { name: "professional", type: "bool" },
      { name: "site_wsop", type: "string" },
      { name: "site_acr", type: "string" },
      { name: "site_party_poker", type: "string" },
      { name: "site_gg_poker", type: "string" },
      { name: "site_888", type: "string" },
      { name: "site_poker_stars", type: "string" },
      { name: "site_borgata", type: "string" },
      { name: "site_bet_mgm", type: "string" },
      { name: "site_pala", type: "string" },
      { name: "site_wpt_global", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Players = InferredTypes["players"];
export type PlayersRecord = Players & XataRecord;

export type DatabaseSchema = {
  players: PlayersRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Dan-Reale-s-workspace-3m1pjh.us-east-1.xata.sh/db/googlemytable",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
