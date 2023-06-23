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
