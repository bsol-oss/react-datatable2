import { ColumnDef, RowData } from '@tanstack/react-table';
export interface DataInterface {
  id: number;
  name: string;
  hub_id: number;
  description: string | null;
  is_active: number;
  bu_id: string;
  actions: string;
}

export interface SubareaInterface {
  count: number;
  filterCount: number;
  results: DataInterface[];
}

export interface FilterInterface {
  offset: number;
  rows: number;
  field: string;
  sort: string;
  searchTerm: string;
  individualSearchTerm: Record<string, string>;
}

export interface RowInterface {
  original: {
    id: number;
    name: string;
    is_active: number;
    description: string | null;
    hub_id: number;
    bu_id: string | null;
  };
}

export type ColumnType<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  Filter?: unknown;
};

export interface Option {
  value: string;
  label: string;
}

export interface DropDownProps {
  id: string;
  label: string;
  options: Option[];
}
