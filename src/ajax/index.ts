import axios from "axios";
import { message } from "antd";

axios.defaults.withCredentials = true; // 跨域
axios.defaults.baseURL = "https://musicapi.leanapp.cn/";
const baseURL = "https://musicapi.leanapp.cn/"
// let instance = axios.create({
//   baseURL: "https://music.163.com/",
//   timeout: 2000,

// });
let whiteList = ["/login", "/register"];

const gainError = (status: number) => {
  let errMsg = "";
  switch (status) {
    case 400:
      errMsg = "错误请求";
      break;
    case 401:
      errMsg = "未授权，请重新登录";
      break;
    case 403:
      errMsg = "拒绝访问";
      break;
    case 404:
      errMsg = "请求错误,未找到该资源";
      break;
    case 405:
      errMsg = "请求方法未允许";
      break;
    case 408:
      errMsg = "请求超时";
      break;
    case 500:
      errMsg = "服务器端出错";
      break;
    case 501:
      errMsg = "网络未实现";
      break;
    case 502:
      errMsg = "网络错误";
      break;
    case 503:
      errMsg = "服务不可用";
      break;
    case 504:
      errMsg = "网络超时";
      break;
    case 505:
      errMsg = "http版本不支持该请求";
      break;
    default:
      errMsg = `连接错误${status}`;
  }
  return errMsg;
};

axios.interceptors.response.use(
  function(response) {
    return response; // 一定要有返回值
  },
  function(error) {
    // TODO:// 401 重定向到登陆
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  config => {
    // @ts-ignore
    if (!whiteList.includes(config.url)) {
      // const res = storage.getToken();
      // if (res) {
      //   console.log(res);
      //   config.headers.Authorization = "Bearer " + storage.getToken();
      // }
    }
    return config;
  },
  error => {}
);

const request = async (url: string, data = {}, type = "GET") => {
  let promise;
  try {
    if (type === "GET") {
      promise = await axios.get(url, { params: data });
    } else {
      promise = await axios.post(url, data);
    }
    return promise.data;
  } catch (error) {
    if (error && error.response) {
      message.error(gainError(error.response.status));
    } else {
      message.error(`Network Error ${error}`);
    }
    if (error && error.response && String(error.response.status) === "401") {
      return {
        status: "401"
      };
    }
  }
};

// http://musicapi.leanapp.cn/personalized?limit=10
/**
 * 推荐歌单
 * @param count 获取数量
 */
export const rqRmdSongList = (count: number = 10) =>
  request(`/personalized?limit=${count}`, {}, "GET");
// export const tryLogin = (account:string, password:string) =>
//   request("/login", { account, password }, "POST");
// export const getMyInfo = () => request("/userinfo", {}, "GET");


/**
 * 获取音乐 https://music.163.com/song/media/outer/url?id=id.mp3
 */
/**
 * 获取歌曲详情 /song/detail?ids=347230
 */
export const rqMusicDesc = async (id: number | string) => {
  let list;
  const musicDetail = await request(`/song/detail?ids=${id}`, {}, "GET");
  try {
    if (musicDetail && musicDetail.code == 200) {
      let rank = musicDetail["songs"][0];
      list = {
        id: rank["id"],
        name: rank["name"],
        author: rank["ar"][0]["name"],
        authorId: rank["ar"][0]["id"],
        picUrl: rank["al"]["picUrl"],
        publishTime: rank["publishTime"]
      };
      console.log('rank', rank)
    }
  } catch (error) { }
      return list;
  
};
/**
 * 获取mv的播放地址 描述 http://musicapi.leanapp.cn/mv/detail?mvid=10904989
 */

/**
 * 获取歌曲榜单
 * @param count 榜单
 */
export const rqTopList = async (count: number = 0) => {
  let list = [];
  const rankList = await request(`/top/list?idx=${count}`, {}, "GET");
  try {
    if (rankList && rankList.code == 200) {
      let rank = rankList["playlist"]["tracks"];
      for (let i in rank) {
        list.push({
          id: rank[i]["id"],
          name: rank[i]["name"],
          author: rank[i]["ar"][0]["name"],
          picUrl: rank[i]["al"]["picUrl"],
          mvId: rank[i]["mv"]
        });
      }
    }

  } catch (error) { }
    return list.slice(0, 10);
  
};

/**
 * 获取mv信息
 * @param count mv数量
 */
export const rqMvList = async (count: number = 12) => {
  let list = [];
  const mvList = await request(`/top/mv?limit=${count}`, {}, "GET");
  try {
    if (mvList && mvList.code == 200) {
      let rank = mvList["data"];
      for (let i in rank) {
        list.push({
          id: rank[i]["id"],
          name: rank[i]["name"],
          author: rank[i]["artistName"],
          authorId: rank[i]["artistId"],
          picUrl: rank[i]["cover"],
          playCount: rank[i]["playCount"]
        });
      }
    }
  } catch (error) { }
    return list;
  
};
