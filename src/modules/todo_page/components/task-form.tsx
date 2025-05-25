import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from '@mui/material';

interface TaskInputProps {
  dates: { label: string; day: number; date: string }[];
  categories: string[];
  onAdd: (date: string, category: string, content: string) => void;
}

export const TaskForm = ({ dates, categories, onAdd }: TaskInputProps) => {
  const [selectedDate, setSelectedDate] = useState(dates[0]?.date || '');
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (!content.trim()) return;
    onAdd(selectedDate, selectedCategory, content.trim());
    setContent('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <FormControl
        size="small"
        fullWidth
      >
        <InputLabel id="select-date-label">Day</InputLabel>
        <Select
          labelId="select-date-label"
          value={selectedDate}
          label="Day"
          onChange={(e: SelectChangeEvent) => setSelectedDate(e.target.value)}
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {dates.map((d) => (
            <MenuItem
              key={d.date}
              value={d.date}
            >
              {d.label} {d.day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        fullWidth
      >
        <InputLabel id="select-category-label">Category</InputLabel>
        <Select
          labelId="select-category-label"
          value={selectedCategory}
          label="Category"
          onChange={(e: SelectChangeEvent) =>
            setSelectedCategory(e.target.value)
          }
          MenuProps={{
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem
              key={cat}
              value={cat}
            >
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Write a task..."
          variant="outlined"
          sx={{ bgcolor: '#fff', borderRadius: 2 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            backgroundColor: '#393433',
          }}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};
