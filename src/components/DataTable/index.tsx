/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  FilterFn,
  ColumnDef,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { DataTableSkeleton } from "./DataTableSkeleton";
import IndeterminateCheckbox from "./IndeterminateCheckBox";
import TableAction, { ActionProps } from "./TableAction";
import DefaultColumn from "./DefaultColumn";
import DebouncedInput from "./Debounce-input";
import ExportTable, { isColumnData } from "./ExportTable";
import DataTableViewOptions from "./DataTableViewOptions";
import DataTableColumnHeader from "./DataTableColumnHeader";
import DataTablePagination from "./DataTablePagination";
import useSkipper from "./useSkipper";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
// import { useFormik } from "formik";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  enableRowSelection?: boolean;
  getSelectedRows?: any;
  enableExport?: boolean;
  enableGlobalSearch?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableIndexing?: boolean;
  editable?: boolean;
  addon?: ReactNode;
  selectedRowsActions?: ActionProps[];
  actions?: ActionProps[];
  loading?: boolean;
  actionType?: AType;
  editIndex?: number[];
  updateData?: (data: TData) => void;
}

export function DataTable<TData>({
  columns,
  data,
  enableRowSelection,
  enableColumnVisibility = false,
  enableExport = true,
  enableGlobalSearch = true,
  enablePagination = true,
  enableIndexing = false,
  actions,
  actionType = "button",
  editable,
  updateData,
  editIndex,
  getSelectedRows = () => {},
  ...rest
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  let tableFactory = () => [...columns];

  if (enableRowSelection || (actions && actions.length > 0) || enableIndexing) {
    tableFactory = () => {
      let _columns = [...columns];

      if (enableIndexing) {
        _columns = [
          {
            id: "index",
            enableSorting: false,
            enableHiding: false,
            header: "#",
            cell: ({ row }) => row.index + 1,
          },

          ..._columns,
        ];
      }

      if (enableRowSelection) {
        _columns = [
          {
            id: "select",
            enableSorting: false,
            enableHiding: false,
            header: ({ table }) => (
              <IndeterminateCheckbox
                checked={table.getIsAllRowsSelected()}
                indeterminate={
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onChange={table.getToggleAllPageRowsSelectedHandler()}
              />
            ),
            cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox
                  checked={row.getIsSelected()}
                  onChange={ row.getToggleSelectedHandler()}
                  disabled={!row.getCanSelect()}
                  indeterminate={
                    (table.getIsSomePageRowsSelected() )
                  }
                />
              </div>
            ),
          },

          ..._columns,
        ];
      }

      if (actions && actions.length > 0) {
        _columns = [
          ..._columns,
          {
            accessorKey: "action",
            header: "",
            cell: ({ row: { original, id } }: any) => {
              return (
                <div className="flex justify-end">
                  {TableAction({
                    isAction: true,
                    title: "Actions",
                    data: { ...original, rowIndex: Number(id) },
                    actions: actions,
                    type: actionType,
                    iconSize: "icon-sm",
                  })}
                </div>
              );
            },
          },
        ];
      }

      return _columns;
    };
  }

  columns = tableFactory();
  const updateRowSelection = (d: any) => {
    setRowSelection(d);
    if (getSelectedRows) {
      getSelectedRows(d);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true,
    debugTable: true,
    defaultColumn: editable ? DefaultColumn(editIndex) : null,
    debugHeaders: true,
    debugColumns: false,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: updateRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    autoResetPageIndex,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      updateData: (rowIndex: number, columnId: number, value: any) => {
        skipAutoResetPageIndex();
        const _data = [...data];
        const updatedData: any = _data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ..._data[rowIndex]!,
              [columnId]: value,
            };
          }
          return row;
        });

        if (updateData) {
          updateData(updatedData);
        }
      },
    },
  });

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="space-y-4 w-full">
      <div className="flex  justify-between  lg:items-center ">
        <div className="flex  items-center justify-between w-full">
          {enableGlobalSearch && (
            <div className="max-w-xs">
              <DebouncedInput
                value={globalFilter}
                onChange={(value: string) => setGlobalFilter(value)}
                placeholder="Filter servers"
              />
            </div>
          )}
          <div className="flex space-x-4">
            {enableExport && <ExportTable table={table} data={data} />}
            {enableColumnVisibility && <DataTableViewOptions table={table} />}
            {selectedRowsCount > 0 &&
              rest.selectedRowsActions?.length &&
              rest.selectedRowsActions?.length > 0 && (
                <div className=" relative w-40">
                  {TableAction({
                    title: `${selectedRowsCount} row(s) selected`,
                    actions: rest.selectedRowsActions,
                    icon: CaretSortIcon,
                    data: table
                      .getFilteredSelectedRowModel()
                      .rows.map((r) => r.original),
                  })}
                </div>
              )}
          </div>
        </div>

        <div className="flex gap-4 items-center">{rest.addon}</div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const className = cn({
                    "w-10": header.id === "select",
                    "w-8": header.id === "index",
                  });

                  if (header.column.getCanSort() && isColumnData(header.id)) {
                    return (
                      <TableHead key={header.id} className={className}>
                        <DataTableColumnHeader
                          column={header.column}
                          title={`${
                            header.getContext().column.columnDef.header
                          }`}
                        />
                      </TableHead>
                    );
                  }

                  return (
                    <TableHead key={header.id} className={className}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!rest.loading && (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {rest.loading && (
        <DataTableSkeleton columnCount={table.getAllColumns().length} />
      )}

      {enablePagination && !rest.loading && (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}
