import { Task, DeletePopOver } from "@components";
import DataContext from "@context/data-context";
import { useContext } from "react";
import { produce } from "immer";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

/**
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.title
 * @param {Array} props.tasks
 * @returns {JSX.Element}
 */

export function Column({ id, title, tasks = [] }) {
  const { setData, selectedBoardIndex } = useContext(DataContext);

  const deleteColumnHandler = () =>
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns = draft[
          selectedBoardIndex
        ].columns.filter((c) => c.id !== id);
      }),
    );

  const addNewTaskHandler = () =>
    setData((prev) =>
      produce(prev, (draft) => {
        const colIndex = draft[selectedBoardIndex]?.columns.findIndex(
          (c) => c.id === id,
        );

        draft[selectedBoardIndex].columns[colIndex].tasks.push({
          id: crypto.randomUUID(),
          title: "",
          description: "",
        });
      }),
    );

  const tasksIds = tasks.length
    ? tasks.map((t) => t.id)
    : [`placeholder-${id}`];

  return (
    <article className="bg-lines-light group/article flex w-72 shrink-0 flex-col gap-6 self-start rounded-lg px-2 shadow">
      <div className="flex justify-between px-2 pt-4">
        <h2 className="text-heading-s group/column text-medium-grey bg-lines-light relative top-0 rounded font-bold tracking-widest uppercase">
          {title}
          <span className="text-main-blue ml-1.5">({tasks.length})</span>
        </h2>
        <DeletePopOver
          parent="article"
          deleteHandler={deleteColumnHandler}
          title={title}
        />
      </div>
      <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
        <div className="mb-2 flex flex-col gap-5 pr-3">
          {tasks.length ? (
            tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                colId={id}
                title={task.title}
                description={task.description}
              />
            ))
          ) : (
            <Task
              isPlaceHolder
              key={`placeholder-${id}`}
              id={`placeholder-${id}`}
              colId={id}
            />
          )}
        </div>
      </SortableContext>
      <button
        type="button"
        onClick={addNewTaskHandler}
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto cursor-pointer border-t px-2 py-4"
      >
        + Add New Task
      </button>
    </article>
  );
}
