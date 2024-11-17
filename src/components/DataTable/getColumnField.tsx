/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionType } from "@/types/select";
import SelectField from "../ui/select-field";
import { Input } from "../ui/input";
import { DatePicker } from "../ui/date-picker";
import { ColumnDef } from "@tanstack/react-table";

type TableColumn<TData = any, TValue = any> = ColumnDef<TData, TValue> & {
  fieldType?: "date" | "text" | "dropdown" | "currency" | "number";
  canSort?: boolean;
  options?: OptionType[];
  columnDef?: any;
};

const getColumnField = (column: TableColumn, formik: any) => {
  const props = {
    label: column.columnDef.header,
    onChange: formik.handleChange,
    value: formik.values[`${column.id}`] || "",
    error: formik.errors[`${column.id}`],
    placeholder: column.columnDef.header,
    options: column.columnDef.options,
    name: column.id,
  };

  switch (column.columnDef.fieldType) {
    case "date":
      return <DatePicker {...props} />;
    case "dropdown":
      return <SelectField {...props} />;
    case "number":
      return <Input {...props} />;
    case "currency":
      return <Input {...props} />;
    default:
      return <Input {...props} />;
  }
};

export default getColumnField;
