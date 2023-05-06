import React from "react";

export function SearchBar(): JSX.Element {
  return (
    <form className="w-full sm:w-2/3">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 fill-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
          </svg>
        </span>
        <input
          className="placeholder:font-italic w-full rounded-full border border-slate-300 bg-white py-2 pl-10 pr-4 focus:outline-none"
          placeholder="Search"
          type="text"
        />
      </label>
    </form>
  );
}

interface FloatingButtonProps {
  handleClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  text?: string;
}

export function FloatingButton({
  handleClick,
  icon,
  text,
}: FloatingButtonProps): JSX.Element {
  return (
    <button
      className="btn-primary fixed bottom-8 right-8 z-30 flex -translate-y-20 rounded-full py-4 font-normal shadow-md shadow-black sm:hidden"
      onClick={handleClick}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="hidden sm:block">{text}</span>
    </button>
  );
}

interface SelectProps {
  checked?: boolean;
  label?: string;
  val?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extraClass?: string;
}

export function SwitchToggle({
  val,
  handleChange,
  checked,
  label,
  extraClass,
}: SelectProps) {
  return (
    <div className={`flex items-center justify-center ${extraClass}`}>
      <div className="relative ml-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          value={val}
          checked={checked}
          id="toggle"
          onChange={handleChange}
          className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 border-primary-500 bg-white transition-all checked:right-0 checked:border-white checked:bg-primary-700 focus:ring-8 checked:active:ring-primary-500"
        />
        <label
          htmlFor="toggle"
          className={
            `toggle-label block h-6 cursor-pointer overflow-hidden rounded-full transition-all` +
            (checked ? ` bg-primary-500` : ` bg-neutral-300`)
          }
        ></label>
      </div>
      <label htmlFor="toggle" className="text-gray-700">
        {label}
      </label>
    </div>
  );
}

interface AnimatedRadioGroupProps {
  icons: string[];
  options: string[];
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selected?: string;
}

// A radio button with background colors than changes if selected.
export function AnimatedRadioGroup({
  options,
  handleChange,
  selected,
  icons,
}: AnimatedRadioGroupProps) {
  return (
    // <div className="grid h-max w-80 grid-cols-4 space-x-2 rounded-xl bg-neutral-200 p-1">
    <div className="flex h-fit rounded-xl bg-neutral-200 p-1">
      {options?.map((option, i) => (
        <div className="grow" key={option}>
          <input
            type="radio"
            name="option"
            id={option}
            className="peer hidden"
            value={option}
            onChange={handleChange}
            checked={selected === option}
          />
          <label
            htmlFor={option}
            className="block cursor-pointer select-none rounded-xl p-1 text-center peer-checked:bg-primary-500 peer-checked:font-bold peer-checked:text-white"
          >
            {icons[i] ? (
              <>
                <span className="hidden sm:inline">{option}</span>
                <span className="material-symbols-outlined text-xs sm:hidden">
                  {icons[i]}
                </span>
              </>
            ) : (
              <span>{option}</span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
}
