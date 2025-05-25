import { GroupedTask, Task } from './type';

// Tạo danh sách 7 ngày tiếp theo từ hôm nay
export function generateNext7Days() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const result: { label: string; day: number; date: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    result.push({
      label: days[date.getDay()],
      day: date.getDate(),
      date: date.toISOString().split('T')[0],
    });
  }

  return result;
}
