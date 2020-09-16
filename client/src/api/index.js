import {objToUrl} from "../utils"

const API_ROOT = "/api/v1"
const JSON_TYPE = {"Content-Type": "application/json"}
const AUTH = token => ({"Authorization": "Bearer " + token})

// AUTH

export const LOGIN = body => {
  return [API_ROOT + "/auth/login", "POST", body, JSON_TYPE]
}

export const REGISTRATION = body => {
  return [API_ROOT + "/auth/registration", "POST", body, JSON_TYPE]
}

// FILE

export const POST_FILE = (body, token) => {
  return [API_ROOT + "/files", "POST", body, AUTH(token)]
}

export const GET_FILE = id => {
  return [API_ROOT + "/files/" + id, "GET"]
}

export const GET_FILE_ALL = (params) => {
  return [API_ROOT + "/files" + objToUrl(params), "GET", null,]
}

export const DELETE_FILE = (id, token) => {
  return [API_ROOT + "/files/" + id, "DELETE", null, AUTH(token)]
}

// FORM

export const POST_FORM = body => {
  return [API_ROOT + "/forms", "POST", body, JSON_TYPE]
}

// DASHBOARD

export const GET_FIELDS = (uri, token) => {
  return [API_ROOT + `/${uri}/fields`, "GET", null, AUTH(token)]
}

export const GET = (uri, id, params = {}) => {
  return [API_ROOT + `/${uri}/` + id + objToUrl(params)]
}

export const GET_ALL = (uri, params = {}) => {
  return [API_ROOT + `/${uri}` + objToUrl(params)]
}

export const CREATE = (uri, body, token) => {
  return [API_ROOT + `/${uri}`, "POST", body, {...AUTH(token), ...JSON_TYPE}]
}

export const EDIT = (uri, id, body, token) => {
  return [API_ROOT + `/${uri}/` + id, "PUT", body, {...AUTH(token), ...JSON_TYPE}]
}

export const PUBLISH = (uri, id, published, token) => {
  return [API_ROOT + `/${uri}/` + id, "PATCH", {published}, {...AUTH(token), ...JSON_TYPE}]
}

export const DELETE = (uri, id, token) => {
  return [API_ROOT + `/${uri}/` + id, "DELETE", null, AUTH(token)]
}







