type SupplierInfoDTO = {
  company: string;
  seller: string;
  contact: string
}

export type WineDTO = {
  id?: string;
  name: string;
  region: string;
  type: string;
  storage: number;
  supplier: SupplierInfoDTO;
};
