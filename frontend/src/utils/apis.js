// const hostname = window.location.host;
const BASE_URL = "http://localhost:8080";

export const getServerStatuses = (pre, success, failure) => {
  pre();
  fetch(`${BASE_URL}/api/sysinfo`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => success(result))
    .catch((error) => failure(error));
};

export const getWidgets = (pre, success, failure) => {
  pre();
  fetch(`${BASE_URL}/api/widgets`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => success(result))
    .catch((error) => failure(error));
};

export const getConfig = (pre, success, failure) => {
  pre();
  fetch(`${BASE_URL}/api/config`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => success(result))
    .catch((error) => failure(error));
};
