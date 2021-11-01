import type { RoleType } from '@/types/role';

export interface ACLType {
  id: any;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  uri: string;
  description: string;
  roles: RoleType[];
}
