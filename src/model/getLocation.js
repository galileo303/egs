require("babel-core/register");
require("babel-polyfill");
import "babel-polyfill";
import request from '../util/request';
import { encodeSearchParams } from '../util/util';
import { requestUrl } from '../config/gaodeSDK';
import axios from 'axios'


export async function queryLocation(params) {
  // return request(`/api/getLocation?${encodeSearchParams(params)}`);
  return axios(`${requestUrl.getLoctionUrl}?${encodeSearchParams(params)}`);
}

export async function queryWay(params) {
  return axios(`${requestUrl.getLoctionPath}?${encodeSearchParams(params)}`);
}