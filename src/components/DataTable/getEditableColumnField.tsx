import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import SelectField from "../ui/select-field";

/* eslint-disable @typescript-eslint/no-explicit-any */
 const getEditableColumnField = (
  type: FieldType,
  value: any = "",
  onChange: any,
  name: string,
  options: any[],
  placeholder: string,
  onBlur: any
) => {
  const props = {
    onChange,
    value,
    placeholder,
    options,
    name,
    onBlur,
    className: "w-max min-w-60",
  };

  switch (type) {
    case "date":
      return <DatePicker {...props} />;
    case "select":
      return <SelectField {...props} />;
    case "number":
      return <Input {...props} />;
    case "currency":
      return <Input {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default getEditableColumnField