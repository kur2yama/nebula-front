/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import type { UserType } from '@/types/user';

export default function access(initialState: { currentUser?: UserType | undefined }) {
  const { currentUser } = initialState || {};

  const currentUserRoles: string[] = currentUser ? currentUser.roles.map((role) => role.name) : [];

  return {
    onlyUser: currentUserRoles.includes('user'),
    onlyAdmin: currentUserRoles.includes('admin'),
    // forTest
    onlyBackend: currentUserRoles.some((role) => ['admin'].includes(role)),
  };
}
