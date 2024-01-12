import { POKERSITE, pokerSites } from "~/data/pokerSites";

export default function PlayerDetails({ player }: { player: any }) {
  return (
    <>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 py-5">
        {player.first_name} {player.last_name}
      </h1>
      <ul className="space-y-2">
        {pokerSites.map(
          (site: POKERSITE, index: number) =>
            player[site.id] && (
              <li className="flex justify-center space-x-5" key={index}>
                <label htmlFor="" className="">
                  {site.label}
                </label>
                <label htmlFor="" className="">
                  {player[site.id]}
                </label>
              </li>
            )
        )}
      </ul>
    </>
  );
}
