export default function FormTextField({
  label,
  id,
  required,
  defaultValue,
}: {
  label: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        </div>
        <div className="mt-2">
          <input
            id={id}
            name={id}
            type="text"
            autoComplete={id}
            required={required}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            data-testid={id}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </>
  );
}
