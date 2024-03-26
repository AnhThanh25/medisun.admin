import request from "@/utils/request";

export function GetPostLst(data) {
  return request({
    url: 'TPost/TGetPostLst',
    method: 'post',
    data: data,
  })
}

export function GetPostByID(data) {
  return request({
    url: 'TPost/GetPostByID',
    method: 'post',
    data: data,
  })
}

export function CreatePost(data) {
  return request({
    url: 'TPost/TCreatePost',
    method: 'post',
    data: data,
  })
}

export function UpdatePost(data) {
  return request({
    url: 'TPost/TUpdatePost',
    method: 'post',
    data: data,
  })
}
