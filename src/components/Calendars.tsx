import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format,isAfter } from "date-fns";
import { Calendar } from "./ui/calendar";

const Calendars: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [year, setYear] = React.useState<number>(new Date().getFullYear());
  const [month, setMonth] = React.useState<Date>(new Date());

  // Generate a list of years for the dropdown
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 4 + i
  );
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          {/* Year Selector */}
          <select
            value={month.getFullYear()}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              const newDate = new Date(newYear, month.getMonth(), 1);
              setMonth(newDate); // Update displayed month in calendar
            }}
            className="mb-2 p-1 border rounded bg-[#5b7cfd] text-white"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Calendar Component */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={month} // Control the month explicitly
            onMonthChange={setMonth} // Keep track of the displayed month
            fromYear={years[0]} // Set min year
            toYear={years[years.length - 1]} // Set max year
            disabled={(day) => isAfter(day, new Date())} // Disable future dates
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Calendars;
