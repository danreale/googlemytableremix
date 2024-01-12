import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa/index.js";
import { Link, useFetcher } from "@remix-run/react";

export default function HandlesList({ handles }: { handles: any }) {
  const fetcher = useFetcher();
  function deleteItemHandler(id: any) {
    const proceed = confirm("Are you sure you want to delete this handle?");

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
          <p>Deleting Handle...</p>
        </article>
      );
    }
  }
  return (
    <>
      <div>
        <ul className="text-center py-5" data-testid="playersList">
          {handles.map((handle: any, index: number) => (
            <li
              key={index}
              className="flex justify-center text-center items-center space-x-5 py-2"
              data-testid="handlesRow"
            >
              <label htmlFor="" data-testid="handle" className="flex">
                {handle.site}
              </label>
              <label htmlFor="" data-testid="handle" className="flex">
                {handle.handle}
              </label>
              <Link
                to={`/players/${handle.playerId.id}/handles/${handle.id}/edit`}
              >
                <FaPencilAlt className="text-orange-400" />
              </Link>

              <button
                className="text-red-500"
                onClick={() => deleteItemHandler(handle.id)}
                data-testid="deleteHandle"
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
