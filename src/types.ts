export interface DataType  {
  id: number;
  name: string;
  hub_id: number;
  description: string | null;
  is_active: number;
  bu_id: string;
  actions: any;
}

export interface SubareaType {
  count: number;
  filterCount: number;
  results: DataType [];
}
