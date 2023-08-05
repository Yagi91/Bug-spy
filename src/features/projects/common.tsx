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

export const Modal = ({ children }: any) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center border bg-neutral-600 bg-opacity-30 p-2 shadow-xl transition-all`}
    >
      {children}
    </div>
  );
};

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
          className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 border-neutral-300 bg-white transition-all checked:right-0 checked:border-primary-500 checked:bg-white"
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
    <div className="flex h-fit rounded-2xl bg-neutral-200 p-1">
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
            className="block flex cursor-pointer select-none items-center rounded-xl p-1 text-center peer-checked:bg-primary-500 peer-checked:font-bold peer-checked:text-white"
          >
            {icons[i] ? (
              <>
                <span className="hidden px-2 sm:inline">{option}</span>
                <span className="material-symbols-outlined px-2 text-sm leading-none sm:hidden">
                  {icons[i]}
                </span>
              </>
            ) : (
              <span className="px-4">{option}</span>
            )}
          </label>
        </div>
      ))}
    </div>
  );
}

interface IconButtonProps {
  icon: string;
  text: string;
  handleClick?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLSpanElement>
  ) => void;
  buttonClass?: string;
  spanClass?: string;
}

// A button with an icon and text that is responsive to screen size.
export const IconButton = ({
  icon,
  text,
  handleClick,
  buttonClass,
  spanClass,
}: IconButtonProps): JSX.Element => {
  return (
    <div>
      <button
        className={
          // The space at the end of the string is important to separate the classes
          "btn-primary justify center hidden items-center gap-2 text-sm sm:flex " +
          buttonClass
        }
        onClick={handleClick}
      >
        <span className="material-symbols-outlined line inline-block leading-3">
          {icon}
        </span>
        <span className="inline-block text-xs md:text-sm">{text}</span>
      </button>
      <span
        className={
          "material-symbols-outlined line marker block cursor-pointer border p-2 sm:hidden " +
          spanClass
        }
        onClick={handleClick}
      >
        {icon}
      </span>
    </div>
  );
};

export const Details = ({
  children,
  summary,
}: {
  children: any;
  summary: string;
}) => {
  return (
    <details className="det mt-1">
      <summary className="flex cursor-pointer list-none items-center">
        {summary}
        <div className="ml-auto" role="button">
          <svg
            className="-mr-1 h-6 w-6 fill-current opacity-75"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </summary>
      {children}
    </details>
  );
};

export const Comment = ({
  name,
  comment,
}: {
  name: string;
  comment: string;
}) => {
  return (
    <div className="mb-2 w-fit rounded-xl border bg-white px-2 py-1">
      <p className="text-xs">{name}</p>
      <p>{comment}</p>
    </div>
  );
};

export const CommentForm = () => {
  return (
    <form className="mx-4 my-1 flex items-center overflow-hidden rounded-xl border bg-white">
      <input
        type="text"
        placeholder="Comment here..."
        className="w-full bg-neutral-100 p-1 focus:outline-0"
      />
      <button type="submit" className="flex items-center bg-neutral-100 px-4">
        <span className="material-symbols-outlined">send</span>
      </button>
    </form>
  );
};

export const CommentSection = () => {
  return (
    <div className="rounded-xl">
      <div className="comments h-28 overflow-y-scroll rounded-[12px] border bg-neutral-100 px-2 py-1">
        <Comment name="Mary" comment="I am currently working on the bug now" />
        <Comment name="John" comment="I made a commit to the branch" />
        <Comment name="John" comment="I made a commit to the branch" />
        <Comment name="John" comment="I made a commit to the branch" />
        <div className={`flex ${`justify-end`}`}>
          <Comment name="You" comment="I fixed the cart button" />
        </div>
      </div>
      <CommentForm />
    </div>
  );
};

interface DoubleIconsTextProps {
  title: string;
  firstIcon?: string;
  secondIcon?: string;
  firstHandleIcon?: () => void;
  secondHandleIcon?: () => void;
  ComponentClass?: string;
  titleClass?: string;
  firstIconClass?: string;
  secondIconClass?: string;
}

export const DoubleIconsText = ({
  title,
  firstIcon,
  secondIcon,
  firstHandleIcon,
  secondHandleIcon,
  titleClass,
  firstIconClass,
  secondIconClass,
  ComponentClass,
}: DoubleIconsTextProps): JSX.Element => {
  return (
    <div className={"flex " + ComponentClass}>
      <span
        className={"material-symbols-outlined leading-0 " + firstIconClass}
        onClick={firstHandleIcon}
        role="button"
        tabIndex={firstHandleIcon ? 0 : -1}
      >
        {firstIcon}
      </span>
      <h3 className={"mr-1 text-left text-lg " + titleClass}>{title}</h3>
      <span
        className={"material-symbols-outlined leading-0 " + secondIconClass}
        onClick={secondHandleIcon}
        role="button"
        tabIndex={0}
      >
        {secondIcon}
      </span>
    </div>
  );
};

// interface ConfirmModalProps{
//   handleYes:()=>void;
//   handleNo:()=>void;
// }

// const ConfirmModal = () => {

//   return(
//     <div className='bg-white'>
//       <h1>Confirm Action</h1>
//       <div className="flex">
//         <button className="btn-primary"onClick={handleYes}>Yes</button>
//         <button className="btn-primary"onClick={handleNo}>No</button>
//       </div>
//     </div>
//   )
// }
