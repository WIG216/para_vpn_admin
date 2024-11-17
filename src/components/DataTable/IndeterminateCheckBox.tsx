/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface IndeterminateCheckboxProps {
  indeterminate?: boolean | string;
  checked?: CheckedState | undefined;
  disabled?: boolean;
  onChange?: (event: unknown) => void;
}

const IndeterminateCheckbox = ({
  indeterminate,
  checked,
  disabled,
  onChange,
}: IndeterminateCheckboxProps) => {
  const ref: any = useRef();

  useEffect(() => {
    if (typeof indeterminate === "boolean" && ref.current) {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate]);

  const handleChange = (checked: any) => {
    if (onChange) onChange({ target: { checked: checked } });
  };

  return (
    <div className="flex justify-center items-center">
      <Checkbox
        checked={checked}
        ref={ref}
        onCheckedChange={handleChange}
        className="translate-y-[2px]"

        disabled={disabled}
      />
    </div>
  );
};

export default IndeterminateCheckbox;
