import { Checkbox, Paper, Typography } from '@mui/material';

interface TaskItemProps {
  id: string;
  content: string;
  isCompleted: boolean;
  onToggle: (id: string) => void;
}

export const TaskItem = ({
  id,
  content,
  isCompleted,
  onToggle,
}: TaskItemProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mb: 1,
        borderRadius: 2,
        backgroundColor: '#f8f6f4',
      }}
    >
      <Checkbox
        size="small"
        checked={isCompleted}
        onChange={() => onToggle(id)}
      />
      <Typography variant="body2">{content}</Typography>
    </Paper>
  );
};
