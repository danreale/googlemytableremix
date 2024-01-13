import { FaPencilAlt, FaTrash } from "react-icons/fa/index.js";
import { Link, useFetcher } from "@remix-run/react";

export default function PlayersList({ players }: { players: any }) {
  const fetcher = useFetcher();
  function deleteItemHandler(id: any) {
    const proceed = confirm("Are you sure you want to delete this player?");

    if (!proceed) {
      return;
    }
    fetcher.submit(
      {
        id,
      },
      {
        method: "delete",
      }
    );

    if (fetcher.state !== "idle") {
      return (
        <article>
          <p>Deleting Player...</p>
        </article>
      );
    }
  }
  return (
    <>
      <div>
        <ul className="text-center py-5" data-testid="playersList">
          {players.map((player: any, index: number) => (
            <li
              key={index}
              className="flex justify-center text-center items-center space-x-5 py-2"
              data-testid="playersRow"
            >
              <label htmlFor="" data-testid="player" className="flex">
                <Link to={`/players/${player.id}/details`}>
                  {player.first_name} {player.last_name}
                </Link>
              </label>
              <button className="text-red-500" data-testid="deleteKeyword">
                <Link to={`/players/${player.id}/edit`}>
                  <FaPencilAlt className="text-orange-400" />
                </Link>
              </button>
              <button
                className="text-red-500"
                onClick={() => deleteItemHandler(player.id)}
                data-testid="deleteKeyword"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
