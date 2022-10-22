import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";

interface props {
  task: string;
  editHandle: (value: string, task: string) => void;
  deleteHandle: (task: string) => void;
}

function ListItem({ task, editHandle, deleteHandle }: props) {
  const [newTask, setNewTask] = useState<string>(task);
  const [edit, setEdit] = useState<Boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      editHandle(newTask, task);
      setEdit(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <li
      className={`list-none flex justify-between items-center ${
        !done ? "bg-green-500" : "bg-red-500"
      } ${
        done && "line-through"
      }  px-4 rounded-md text-white text-xl py-5 mb-2`}
    >
      {edit ? (
        <input
          ref={inputRef}
          onKeyDown={keyDownHandler}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="md:w-1/2 bg-green-300 px-2 py-1 rounded text-gray-700 focus:outline-none"
        />
      ) : (
        <>{task}</>
      )}

      <div className="flex gap-2">
        <AiFillEdit
          onClick={() => setEdit(!edit)}
          className=" text-2xl transition duration-200 cursor-pointer hover:text-blue-800"
        />
        <AiFillDelete
          onClick={() => deleteHandle(task)}
          className=" text-2xl transition duration-200 cursor-pointer hover:text-red-800"
        />
        <MdOutlineDone
          onClick={() => setDone(!done)}
          className=" text-2xl transition duration-200 cursor-pointer hover:text-green-800"
        />
      </div>
    </li>
  );
}

export default ListItem;
