import { useState, useCallback } from 'react';
import { useModel, request } from 'umi';
import wx from 'weixin-js-sdk-ts';
import { DEFAULT_LOGO } from '@/constants';

// 要分享的页面
export type SharePageParams = {
  title: string;
  description?: string;
  cover?: string;
};

// 属性
export type UseWechatProps = {
  /**
   * 初始化分享页
   * @param params
   */
  initSharePage?: (params: SharePageParams) => void;
};

// TODO 替换为 @nebula/hooks的方法
const isIOS = () => false;
const isWechat = () => false;

export default function useWechat(): UseWechatProps {
  const { initialState } = useModel('@@initialState');
  const [configured, setConfigured] = useState(false);

  const initSharePage = useCallback(
    async (params: SharePageParams) => {
      // 如果在微信下打开才进行初始化
      if (isWechat() && initialState) {
        // 如果不是 ios 或者 还没有配置过，则请求并配置
        if (!isIOS() || !configured) {
          // 如果是ios 这是要 landingUrl 否则 使用当前 url(需要截取 # 前的url);
          const configUrl = isIOS() ? initialState.landingUrl : window.location.href.split('#')[0];
          // 请求签名信息
          const response = await request(`/v1/wechat/js/config`, { params: { url: configUrl } });
          // 设置权限
          if (response.success) {
            wx.config(response.data);
            wx.ready(() => {
              setConfigured(true);
              // 分享到微信
              wx.updateAppMessageShareData({
                title: params.title,
                desc: params.description || '',
                link: window.location.href,
                imgUrl: params.cover || DEFAULT_LOGO,
                success() {},
                cancel() {},
              });
              // 分享到微信
              wx.updateTimelineShareData({
                title: params.title,
                link: window.location.href,
                imgUrl: params.cover || DEFAULT_LOGO,
                success() {},
                cancel() {},
              });
            });
          }
        }
      }
    },
    [initialState, configured],
  );

  return { initSharePage };
}
