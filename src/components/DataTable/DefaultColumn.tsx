/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import getEditableColumnField from "./getEditableColumnField";

/* eslint-disable @typescript-eslint/no-explicit-any */
 const DefaultColumn = (editIndex: number[] = []): any => {
  return {
    cell: ({
      getValue,
      row: { index },
      column: { id, ...rest },
      table,
    }: any) => {
      const metaData = rest.columnDef.meta;
      if (!editIndex.includes(index) || metaData.editable === false) {
        return getValue();
      }

      const initialValue = getValue();
      const [value, setValue] = useState(initialValue);

      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      const handleChange = (e: any) => {
        setValue(e.target.value);
      };

      return getEditableColumnField(
        metaData.type,
        value,
        handleChange,
        rest.columnDef.header,
        metaData.options,
        metaData.placeholder,
        onBlur
      );
    },
  };
};

export default DefaultColumn;