import { ColumnDef } from "@tanstack/react-table";

export interface SearchableColumn<T> {
  label: string;
  value: keyof T;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  searchableColumns: SearchableColumn<T>[];
  emptyMessage?: string;
}
