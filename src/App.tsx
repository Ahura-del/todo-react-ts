import { useState, ChangeEvent, FormEvent } from "react";
import ListItems from "./components/ListItem";
import Modal from "./components/Modal";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string>("");
  const taskHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  const formHandle = (e: FormEvent) => {
    e.preventDefault();
    if (task === "") {
      return setErrorText("Please add some task");
    }
    setTasks([...tasks, task]);
    setModal(false);
    setTask("");
  };

  const editHandle = (value: string, oldTask: string) => {
    setTasks(tasks.map((item) => (item === oldTask ? value : item)));
  };

  const deleteHandle = (task: string) => {
    setTasks(tasks.filter((item) => item !== task));
  };
  return (
    <div className="w-full flex items-center justify-center h-screen bg-slate-900">
      <div className="w-11/12 h-5/6 md:w-3/4 p-5 bg-white rounded-2xl shadow-2xl relative">
        {tasks.length > 0 ? (
          <div>
            <h1 className="text-3xl font-medium text-cyan-800 pb-10">Todo</h1>
            {tasks.map((task, idx) => (
              <ListItems
                task={task}
                editHandle={editHandle}
                deleteHandle={deleteHandle}
                key={idx}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full justify-center items-center">
            <h3 className="text-4xl font-medium text-cyan-700">Empty!</h3>
          </div>
        )}
        <button
          id="modalBtn"
          onClick={() => setModal(!modal)}
          className=" flex content-center justify-center h-14 w-14 text-5xl text-white align-center bg-cyan-400 rounded-full absolute bottom-3 right-3 z-10 outline-none focus:outline-none transition duration-200 hover:bg-cyan-500 hover:-translate-y-1"
        >
          +
        </button>

        {/* modal */}
        <Modal
          state={modal}
          task={task}
          taskHandle={taskHandle}
          formHandle={formHandle}
          errorText={errorText}
        />
      </div>
    </div>
  );
}

export default App;
