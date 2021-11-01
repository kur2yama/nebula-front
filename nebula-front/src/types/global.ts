import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { SiteType } from '@/types/site';
import type { UserType } from '@/types/user';

export type InitialStateType = Promise<{
  landingUrl?: string;
  settings?: Partial<LayoutSettings>;
  currentSite?: SiteType;
  currentUser?: UserType;
  isLoggedIn?: boolean;
  fetchCurrentSite?: () => Promise<ResponseType | undefined>;
  fetchCurrentUser?: (token?: string) => Promise<ResponseType | undefined>;
}>;

export type ResponseShowType = 'silent' | 'warn' | 'error' | 'notification' | 'redirect';

export type ResponseType = {
  success: boolean;
  message?: string;
  data?: any;
  showType?: ResponseShowType;
};

export type TokenType = {
  token: string;
  expiredAt: number;
} & Omit<ResponseType, 'data'>;

export type RouteType = {
  name?: string;
  pathname?: string;
};

export type PaginationType = {
  current: number;
  pageSize: number;
  total: number;
};

export type WxType = {
  config: (config: any) => void;
  checkJsApi: (config: any) => void;
  ready: (config: any) => void;
  updateAppMessageShareData: (config: any) => void;
  updateTimelineShareData: (config: any) => void;
};
