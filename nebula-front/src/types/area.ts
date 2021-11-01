export type AreaType = {
  id: any;
  parentId: any | null;
  name: string;
  displayName: string;
  title?: string;
  label?: string;
  value?: string;
  children?: AreaType[];
};
