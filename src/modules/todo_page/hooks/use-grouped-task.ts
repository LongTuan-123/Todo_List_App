import { useMemo } from 'react';
import { Task, TaskDetail } from '../type';

type GroupedTaskFlat = {
  date: string;
  [category: string]: TaskDetail[] | string; // date is string, other keys are arrays of TaskDetail
};

export const useGroupedTasks = (tasks: Task[]) => {
  return useMemo(() => {
    const groupedMap = new Map<
      string,
      Map<string, Omit<Task, 'date' | 'category'>[]>
    >();
    const categorySet = new Set<string>();

    tasks.forEach(({ date, category, ...rest }) => {
      categorySet.add(category);

      if (!groupedMap.has(date)) {
        groupedMap.set(date, new Map());
      }

      const categoryMap = groupedMap.get(date)!;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }

      categoryMap.get(category)!.push(rest);
    });

    const groupedTasks: GroupedTaskFlat[] = [];

    groupedMap.forEach((categoryMap, date) => {
      const groupedEntry: GroupedTaskFlat = { date };

      categoryMap.forEach((taskList, category) => {
        groupedEntry[category] = taskList;
      });

      groupedTasks.push(groupedEntry);
    });

    const uniqueCategories = Array.from(categorySet);

    return { groupedTasks, uniqueCategories };
  }, [tasks]);
};
