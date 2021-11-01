import type { GroupType } from '@/types/group';
import type { RoleType } from '@/types/role';

export interface SelectionBindType {
  projectId: string;
  userName: string;
  password: string;
  token: string;
  expiredAt: string;
}

export interface UserType {
  id?: any;
  siteId: number;
  email: string;
  emailVerified: boolean;
  username?: string;
  mobile?: string;
  nickname: string;
  avatar: string;
  roles: RoleType[];
  groups: GroupType[];
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
