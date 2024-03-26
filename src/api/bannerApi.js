import request from "@/utils/request";

export function TGetBannerLst(data) {
  return request({
    url: 'TBanner/TGetBannerLst',
    method: 'post',
    data: data,
  })
}

export function TGetBannerLstPublic(data) {
  return request({
    url: 'TBanner/TGetBannerLstPublic',
    method: 'post',
    data: data,
  })
}

export function TDelBanner(data) {
  return request({
    url: 'TBanner/TDelBanner',
    method: 'post',
    data: data,
  })
}
