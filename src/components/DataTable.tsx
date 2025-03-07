"use client";
import av1 from "../images/av1.avif";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log("data",data)
  return (

    <div className="rounded-md border-none">
      <Table>
        <TableHeader className="bg-gray-100 h-16">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="mx-4">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-20 hover:pointer "
                onClick={() => console.log('row clicked',row.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} >
                    <div className={`flex items-center h-16  overflow-hidden ${cell.column.id==='address'? 'w-20  overflow-auto': 'w-inherit'}`}>
                      {cell.column.id === "snsdId" && (
                        <Avatar>
                          <AvatarImage
                            src={av1}
                            className="h-12 w-12  rounded-full mr-3"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      )}
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
