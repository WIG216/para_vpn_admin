/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = React.HTMLAttributes<HTMLDivElement> &
CalendarProps & {
  value?: any;
  label?: string;
  error?: string;
  name?: string;
  onChange?: (event: { target: { name?: string; value: string } }) => void;

}
export function DatePicker({
  className,
  onChange = () => {},
  mode = "range",
  fromYear = 2000,
  toYear = new Date().getFullYear(),
  numberOfMonths= 1,
  name,
  value: date,
  label,
  ...rest
}: DatePickerProps) {
  const handleChange = (data: any) => {
    onChange({target: {name, value: data}});
  };
  

  return (
    <div className="space-y-1">
     {label && <label htmlFor="date" className="text-sm font-medium">{label}</label>}
          <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start bg-white text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {mode === "range" ? (
              <>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </>
            ) : (
              <>{date ? format(date, "PPP") : <span>Pick a date</span>}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...rest}
            numberOfMonths={numberOfMonths}
            mode={mode}
            captionLayout="dropdown"
            selected={date}
            onSelect={handleChange}
            fromYear={fromYear}
            toYear={toYear}
          />
        </PopoverContent>
      </Popover>
    </div>
    </div>
  );
}
