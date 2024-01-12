import { Outlet } from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";
import NavigationHeader from "~/components/Header";

export default function PlayersLayout() {
  return (
    <>
      <NavigationHeader />
      <Outlet />
    </>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Google My Table" },
    {
      name: "description",
      content: "Lookup your poker competition",
    },
  ];
};
