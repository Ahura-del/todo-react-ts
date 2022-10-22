import { ChangeEvent, FormEvent, useEffect, useRef } from "react";

interface props {
  state: boolean;
  task: string;
  taskHandle: (e: ChangeEvent<HTMLInputElement>) => void;
  formHandle: (e: FormEvent) => void;
  errorText: string;
}

function Modal({ state, task, taskHandle, formHandle, errorText }: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [state]);
  return (
    <div
      style={state ? { display: "block" } : { display: "none" }}
      className="w-5/6 md:w-1/2 absolute z-10 bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 p-6 rounded-xl bg-white shadow-2xl"
    >
      <h3 className="text-center pb-5 text-2xl font-medium">Create task</h3>
      <form onSubmit={formHandle} className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={task}
          onChange={taskHandle}
          className="border w-full text-gray-500 border-gray-400 px-3 rounded placeholder:text-gray-400 focus:outline-gray-500"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-black border text-white rounded hover:bg-white hover:shadow-xl transition-all duration-300 hover:text-black hover:border-black"
        >
          Add
        </button>
      </form>
      <p className="pt-2 text-sm text-red-500">{errorText}</p>
    </div>
  );
}

export default Modal;
