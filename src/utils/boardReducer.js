export const initialBoard = () => ({
  id: crypto.randomUUID(),
  title: "",
  columns: [{ id: crypto.randomUUID(), title: "", tasks: [] }],
});

export const ACTIONS = {
  UPDATE_TITLE: "update-title",
  REMOVE_COLUMN: "remove-column",
  ADD_COLUMN: "add-column",
  UPDATE_COLUMN_TITLE: "update-column-title",
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.UPDATE_TITLE:
      return { ...state, title: payload.title };
    case ACTIONS.REMOVE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter((col) => col.id !== payload.id),
      };
    case ACTIONS.ADD_COLUMN:
      return {
        ...state,
        columns: [
          ...state.columns,
          { id: crypto.randomUUID(), title: "", tasks: [] },
        ],
      };
    case ACTIONS.UPDATE_COLUMN_TITLE: {
      const updatedColumns = [...state.columns].map((col) => {
        if (col.id === payload.id) {
          return { ...col, title: payload.title };
        }
        return col;
      });
      return {
        ...state,
        columns: [...updatedColumns],
      };
    }
    default:
      return state;
  }
}
