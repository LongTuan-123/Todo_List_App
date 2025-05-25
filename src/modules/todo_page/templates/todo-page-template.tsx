import { useMemo, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import get from 'lodash/get';

import { TaskCategory } from '../components/task-category';
import { DateSelector } from '../components/date-selector';
import { TaskForm } from '../components/task-form';
import { generateNext7Days } from '../ultils';
import { GroupedByDate, Task } from '../type';
import { mockTasks } from '../mock';
import { toast } from 'react-toastify';

export const TodoPageTemplate = () => {
  const dates = useMemo(() => generateNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0].date);

  // convert mockTasks thành list các task đã được nhóm theo ngày và category
  const initialGrouped = useMemo(() => {
    const map = new Map<string, GroupedByDate>();

    mockTasks.forEach((task) => {
      if (!map.has(task.date)) {
        map.set(task.date, { date: task.date });
      }

      const group = map.get(task.date)!;
      if (!group[task.category]) {
        group[task.category] = [];
      }

      (group[task.category] as Task[]).push(task);
    });

    return Array.from(map.values());
  }, [mockTasks]);

  const [groupedTasks, setGroupedTasks] =
    useState<GroupedByDate[]>(initialGrouped);

  // Kiểm tra xem ngày đã chọn có phải là hôm nay không
  const isToday = (dateStr: string): boolean => {
    const today = new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    return (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    );
  };

  // Lấy các task theo ngày đã chọn
  const tasksByDate = useMemo(() => {
    return (
      groupedTasks.find((group) => group.date === selectedDate) || {
        date: selectedDate,
      }
    );
  }, [groupedTasks, selectedDate]);

  // Lấy danh sách các category duy nhất từ groupedTasks
  const listCategories = useMemo(() => {
    const categories = new Set<string>();
    groupedTasks.forEach((group) => {
      Object.keys(group).forEach((key) => {
        if (key !== 'date') categories.add(key);
      });
    });
    return Array.from(categories);
  }, [groupedTasks]);

  // Tạo một Set chứa các ID của task đã hoàn thành theo ngày đã chọn
  const selectedIds = useMemo(() => {
    const completedSet = new Set<string>();
    Object.entries(tasksByDate).forEach(([key, taskList]) => {
      if (key === 'date' || !Array.isArray(taskList)) return;
      taskList.forEach((task) => {
        if (task.isCompleted) {
          completedSet.add(task.id);
        }
      });
    });
    return completedSet;
  }, [tasksByDate]);

  // Toggle giá trị isCompleted của một task
  const toggleTask = useCallback(
    (id: string) => {
      setGroupedTasks((prev) => {
        const updated = cloneDeep(prev);
        // Tìm nhóm task theo ngày đã chọn
        const todayGroup = updated.find((group) => group.date === selectedDate);
        if (!todayGroup) return updated;

        // Loop qua các category trong nhóm hôm nay để tìm task theo ID
        for (const key in todayGroup) {
          if (key === 'date') continue;

          const taskList = todayGroup[key] as Task[];
          const index = taskList.findIndex((task) => task.id === id);
          if (index !== -1) {
            taskList[index].isCompleted = !taskList[index].isCompleted;
            break;
          }
        }

        return updated;
      });
    },
    [selectedDate]
  );

  // Thêm một task mới vào ngày và category
  const handleAddTask = useCallback(
    (date: string, category: string, content: string) => {
      const newTask: Task = {
        id: uuidv4(),
        date,
        category,
        content,
        isCompleted: false,
      };

      //Dùng lodash để truy cập vào object để set giá trị mới
      setGroupedTasks((prev) => {
        const updated = cloneDeep(prev);
        const index = updated.findIndex((group) => group.date === date);

        if (index !== -1) {
          const categoryList = get(updated[index], category, []);
          set(updated[index], category, [...categoryList, newTask]);
        } else {
          updated.push({
            date,
            [category]: [newTask],
          });
        }

        return updated;
      });
      toast('Added new task successfully!', { type: 'success' });
      setSelectedDate(date);
    },
    []
  );

  return (
    <Box sx={{ width: '100%', mx: 'auto', p: 2, fontFamily: 'sans-serif' }}>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={2}
      >
        {`Tasks for ${isToday(selectedDate) ? 'Today' : selectedDate}`}
      </Typography>

      <DateSelector
        dates={dates}
        selected={selectedDate}
        onSelect={setSelectedDate}
      />

      <Box
        sx={{
          height: 'calc(100vh - 400px)',
          overflowY: 'auto',
          marginBottom: 2,
        }}
      >
        {listCategories.map((category) => (
          <TaskCategory
            key={category}
            title={category}
            tasks={
              Array.isArray(tasksByDate[category])
                ? (tasksByDate[category] as Task[])
                : []
            }
            onToggle={toggleTask}
            selectedIds={selectedIds}
          />
        ))}
      </Box>

      <TaskForm
        dates={dates}
        categories={listCategories}
        onAdd={handleAddTask}
      />
    </Box>
  );
};

export default TodoPageTemplate;
