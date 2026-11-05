import type { FormEvent, InputHTMLAttributes } from "react";
import { Icon } from "./icon";

type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  onSubmitSearch?: (query: string) => void;
};

export function SearchBar({
  className = "",
  onSubmitSearch,
  ...props
}: SearchBarProps) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = String(data.get(props.name ?? "q") ?? "");
    onSubmitSearch?.(query);
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className={`flex h-[42px] items-center gap-2.5 rounded-search border border-n-300 bg-n-100 py-2.5 pr-5 pl-[18px] focus-within:border-z-300 focus-within:bg-n-000 ${className}`}
    >
      <Icon name="search" className="size-4 text-n-500" />
      <input
        type="search"
        name={props.name ?? "q"}
        className="min-w-0 flex-1 bg-transparent font-display text-sm font-medium text-n-900 outline-none placeholder:text-n-500"
        {...props}
      />
    </form>
  );
}
