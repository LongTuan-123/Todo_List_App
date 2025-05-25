import { Grid, Paper, Typography } from '@mui/material';

interface DateSelectorProps {
  dates: { label: string; day: number; date: string }[];
  selected: string;
  onSelect: (date: string) => void;
}

export const DateSelector = ({
  dates,
  selected,
  onSelect,
}: DateSelectorProps) => {
  return (
    <Grid
      container
      spacing={1}
      mb={3}
    >
      {dates.map((date) => (
        <Grid key={date.date}>
          <Paper
            elevation={0}
            onClick={() => onSelect(date.date)}
            sx={{
              px: 1.5,
              py: 0.5,
              textAlign: 'center',
              borderRadius: 2,
              cursor: 'pointer',
              backgroundColor: date.date === selected ? '#f5ede5' : '#f7f7f7',
            }}
          >
            <Typography
              variant="body2"
              fontWeight={500}
            >
              {date.label}
            </Typography>
            <Typography
              variant="caption"
              fontWeight={500}
            >
              {date.day}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
