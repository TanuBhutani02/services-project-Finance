export const getTotalWorkingHours = (month: number, year: number): number => {
    const daysInMonth = new Date(year, month, 0).getDate();
    let totalHours = 0;
  
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month - 1, day);
      const dayOfWeek = currentDate.getDay();
  
      // Exclude Saturdays (6) and Sundays (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalHours += 8; // 8 hours per working day
      }
    }
  
    return totalHours;
  };