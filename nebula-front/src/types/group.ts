export interface GroupType {
  id?: any;
  parentId?: number | null;
  name: string;
  displayName: string;
  title?: string;
  label?: string;
  value?: string;
  groupNum?: number;
  children?: GroupType[];
}
