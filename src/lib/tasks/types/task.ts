interface Task {
  id: number;
  name: string;
  organizationId: number;
  dueDate: string;
  done: boolean;
  description: string | null;
}

export default Task;