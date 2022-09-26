import { format } from 'date-fns';

const useTimeRange = () => {
  const today = new Date();
  const now = format(today, 'H');

  let hourStart;
  let hourEnd;
  switch (true) {
    case now < 5:
      hourStart = 0;
      hourEnd = 5;
      break;
    case now < 12:
      hourStart = 5;
      hourEnd = 12;
      break;
    case now < 18:
      hourStart = 12;
      hourEnd = 18;
      break;
    default:
      hourStart = 18;
      hourEnd = 24;
  }

  return { hourStart, hourEnd };
};

export default useTimeRange;
