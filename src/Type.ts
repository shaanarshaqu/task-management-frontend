export interface Task {
  id: String;
  createdAt: String;
  updatedAt: String;
  title: String;
  description: String;
}

export interface TaskDto {
  title: String;
  description: String;
}
