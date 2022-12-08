export interface ITask {
  id: string;
  title: string;
  description?: string;
  createDate: number;
  done: boolean;
}
