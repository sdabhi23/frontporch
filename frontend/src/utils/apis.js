export const getServerStatuses = (pre, success, failure) => {
    pre();
    const hostname = window.location.host;
    fetch(`http://${hostname}/api/sysinfo`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => success(result))
      .catch((error) => failure(error));
  };

  export const getWidgets = (pre, success, failure) => {
    pre();
    const hostname = window.location.host;
    fetch(`http://${hostname}/api/widgets`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => success(result))
      .catch((error) => failure(error));
  };