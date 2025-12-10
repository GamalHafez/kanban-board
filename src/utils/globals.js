export const EDIT_MODES = Object.freeze({
  EDIT: { title: "edit", submitText: "Save Changes" },
  CREATE: { title: "create", submitText: "Create New Board" },
});

export const DIALOG_DATA = {
  EDIT: {
    key: "edit",
    label: "Edit Board",
    title: "Edit Board",
    description: "Make changes to your profile here.",
  },
  DELETE: {
    key: "delete",
    label: "Delete Board",
    title: "Delete this Board?",
    description: "Are you sure you want to delete this board?",
  },
  MOBILE_MENU: {
    key: "mobileMenu",
  },
};

export const DELETE_VARIANTS = {
  card: "group-hover/card:visible",
  article: "group-hover/article:visible",
};
