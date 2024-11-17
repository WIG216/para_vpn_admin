import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface DebouncedInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  debounce?: number;
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  placeholder,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (

    <Input
      value={value}
      placeholder={placeholder}
      className='w-[150px] lg:w-[250px]'
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default DebouncedInput;
