import  { InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as ShadInput } from "@/components/ui/input";

interface InputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder: string;
  description?: string;
}

export const Input = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  ...props
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ShadInput
              className={props.className}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}{" "}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
