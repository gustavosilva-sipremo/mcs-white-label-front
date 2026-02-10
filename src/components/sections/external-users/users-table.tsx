import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { usersColumns } from "./users-columns";
import { UserModel } from "@/mocks/mock-external-users";

interface UsersTableProps {
  data: UserModel[];
}

const searchableColumns: { label: string; value: keyof UserModel }[] = [
  { label: "Nome", value: "name" },
  { label: "Email", value: "email" },
  { label: "Setor", value: "department" },
  { label: "Função", value: "role" },
  { label: "Tipo", value: "accountType" },
];

export function UsersTable({ data }: UsersTableProps) {
  const [columnFilter, setColumnFilter] =
    React.useState<keyof UserModel>("name");
  const [filterValue, setFilterValue] = React.useState("");

  const table = useReactTable<UserModel>({
    data,
    columns: usersColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Aplica o filtro quando coluna ou valor mudar
  React.useEffect(() => {
    table.resetColumnFilters();

    const column = table.getColumn(columnFilter);
    if (column) {
      column.setFilterValue(filterValue);
    }
  }, [columnFilter, filterValue, table]);

  // Renderiza a barra de filtros
  const renderFilters = () => (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={columnFilter}
        onValueChange={(value) => setColumnFilter(value as keyof UserModel)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Pesquisar por" />
        </SelectTrigger>
        <SelectContent>
          {searchableColumns.map((col) => (
            <SelectItem key={col.value} value={col.value}>
              {col.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Pesquisar..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {renderFilters()}

      {/* Tabela */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={usersColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
