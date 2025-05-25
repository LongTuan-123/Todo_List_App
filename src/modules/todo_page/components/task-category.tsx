import { Box, Typography } from '@mui/material';
import { TaskItem } from './task-item';
import { TaskDetail } from '../type';

interface TaskCategoryProps {
  title: string;
  tasks: TaskDetail[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export const TaskCategory = ({
  title,
  tasks,
  selectedIds = new Set(),
  onToggle,
}: TaskCategoryProps) => {
  return (
    <Box mb={2}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        mb={1}
      >
        {title}
      </Typography>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          content={task.content}
          isCompleted={selectedIds.has(task.id)}
          onToggle={onToggle}
        />
      ))}
    </Box>
  );
};
