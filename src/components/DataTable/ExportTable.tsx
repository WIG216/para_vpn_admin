/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionType } from "@/types/select";
import { Table, ColumnDef } from "@tanstack/react-table";
import tableExport from "antd-table-export";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import {  FaFileExcel, FaFilePdf } from "react-icons/fa";
import { PDFTable } from "./pdf-table";
import { usePDF } from "react-to-pdf";


interface ExportTableProps<TData> {
  table: Table<TData>;
  data: any
}



export default function ExportTable<TData = any>({
  table,
  data = [],
}: ExportTableProps<TData> ) {
  // Filter Columns
  const columns = filterColumns(table).map((column) => ({
    header: column.columnDef.header,
    accessorKey: column.columnDef.accessorKey,
  }));

//   const getExportCol = () => {
//     return columns.map((column: any) => ({
//       displayName: column.header,
//       id: column.accessorKey,
//     }));
//   };

  const exportExcel = () => {
    const exportInstance = new tableExport(
      data,
      columns.map((column: any) => ({
        title: column.header,
        dataIndex: column.accessorKey,
      }))
    );
    exportInstance.download(window.document.title, "xlsx");
  };

  const { toPDF, targetRef } = usePDF({
    filename: window.document.title + ".pdf",
    page: { margin: 4 },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline">
            <Download className="size-4 mr-2" /> Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[100px]">
          

          <DropdownMenuItem onSelect={exportExcel}>
            <FaFileExcel className="mr-1" /> Excel
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={toPDF as any}>
            <FaFilePdf className="mr-1" /> PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-0 overflow-hidden w-0">
        <div className="w-screen" ref={targetRef}>
          <PDFTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

type TableColumn<TData = any, TValue = any> = ColumnDef<TData, TValue> & {
  fieldType?: "date" | "text" | "dropdown" | "currency" | "number";
  canSort?: boolean;
  options?: OptionType[];
  columnDef?: any;
};

// eslint-disable-next-line react-refresh/only-export-components
export const isColumnData = (column: string) => {
  const headers = ["select", "action"];
  return !headers.includes(column);
};

const filterColumns = (table: any): any[] | TableColumn[] => {
  return table
    .getAllColumns()
    .filter(
      (column: any) =>
        !column.columnDef.disableFilter && isColumnData(column.id)
    );
};


