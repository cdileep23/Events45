"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

// Add this CSS to your global.css file
/*
.react-datepicker-wrapper {
  width: 100%;
}

.react-datepicker {
  @apply bg-white border border-gray-200 rounded-md shadow-lg font-sans;
}

.react-datepicker__header {
  @apply bg-gray-50 border-b border-gray-200 rounded-t-md;
}

.react-datepicker__month {
  @apply mt-1;
}

.react-datepicker__day-name {
  @apply text-gray-600 text-xs font-medium mx-1;
}

.react-datepicker__day {
  @apply mx-1 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors;
}

.react-datepicker__day--selected,
.react-datepicker__day--keyboard-selected {
  @apply bg-blue-600 text-white hover:bg-blue-700 hover:text-white;
}

.react-datepicker__day--outside-month {
  @apply text-gray-300;
}

.react-datepicker__time-container {
  @apply border-l border-gray-200;
}

.react-datepicker__time-container .react-datepicker__time {
  @apply bg-white rounded-br-md;
}

.react-datepicker__time-container .react-datepicker__time-box {
  @apply w-full;
}

.react-datepicker__time-list-item {
  @apply hover:bg-blue-50 hover:text-blue-600 transition-colors;
}

.react-datepicker__time-list-item--selected {
  @apply bg-blue-600 text-white hover:bg-blue-700 hover:text-white;
}

.react-datepicker__triangle {
  display: none;
}
*/

interface DatePickerInputProps {
  value: Date;
  onClick: () => void;
  label: string;
  placeholder?: string;
  hasError?: boolean;
}

interface StyledDateTimePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  error?: string;
  placeholder?: string;
}

const StyledDateTimePicker = ({
  label,
  value,
  onChange,
  minDate,
  error,
  placeholder
}: StyledDateTimePickerProps) => {
  // Custom input component with calendar icon
  const DatePickerInput = forwardRef<HTMLDivElement, DatePickerInputProps>(
    ({ value, onClick, label, placeholder, hasError }, ref) => (
      <div 
        className={`relative w-full cursor-pointer ${hasError ? 'focus-within:ring-red-500' : 'focus-within:ring-blue-500'}`}
        onClick={onClick}
        ref={ref}
      >
        <div 
          className={`flex items-center w-full px-4 py-2 bg-white border rounded-md transition-colors ${
            hasError 
              ? 'border-red-300 focus-within:border-red-500' 
              : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500'
          }`}
        >
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-gray-700">
              {value ? format(new Date(value), "MMM d, yyyy h:mm aa") : placeholder || "Select date & time"}
            </p>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <CalendarIcon className="h-4 w-4" />
            <ClockIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    )
  );

  DatePickerInput.displayName = "DatePickerInput";

  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={(date: Date) => onChange(date)}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMM d, yyyy h:mm aa"
        wrapperClassName="w-full"
        minDate={minDate}
        popperClassName="z-50"
        popperPlacement="bottom-start"
        customInput={
          <DatePickerInput 
            value={value} 
            onClick={() => {}} 
            label={label}
            hasError={!!error}
          />
        }
        calendarClassName="responsive-datepicker"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default StyledDateTimePicker;