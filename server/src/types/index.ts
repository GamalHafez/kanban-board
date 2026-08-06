export type UserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BoardResponse = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  columns: ColumnResponse[];
};

export type ColumnResponse = {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: TaskResponse[];
};

export type TaskResponse = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};
