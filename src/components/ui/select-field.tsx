/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { OptionType, SelectProps } from "@/types/select";
import List from "../DataTable/list";


export default function SelectField(props: SelectProps) {
  const handleChange = (value: any) => {
    if (props.onChange) {
      props.onChange({ target: { name: props.name as string, value } });
    }
  };

  const triggerCn = cn('text-gray-500', {'border-red-400': props.error})
  return (
    <div className={cn('space-y-1', props.className)}>
      {props.label && (
        <label className="text-sm font-medium">{props.label}</label>
      )}
      <Select value={props.value} onValueChange={handleChange}>
        <SelectTrigger className={triggerCn} disabled={props.disabled}>
          <SelectValue  placeholder={props.placeholder || "Select"} />
        </SelectTrigger>
        <SelectContent>
          <List
            data={props.options || []}
            renderer={(option: OptionType, key) => {
              const Prefix = () => option.prefix;
              const Suffix = () => option.suffix;
              const Component = () => option.component;

              return (
                <SelectItem key={key} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.prefix && <Prefix />}
                    {option.component ? (
                      <Component />
                    ) : (
                      <span className={cn(option.className)}>{option.label}</span>
                    )}
                    {option.suffix && <Suffix />}
                  </div>
                </SelectItem>
              );
            }}
          />
        </SelectContent>
      </Select>
      {props.error && <p className="text-red-500 text-xs">{props.error}</p>}
    </div>
  );
}
