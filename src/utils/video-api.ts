const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhcGlrZXkiOiIxMDExODE3Ni0yNmM3LTQzNzgtYTNiYy03Zjg1YmFkMGVlMDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfbW9kIl0sImV4cCI6MTY4Njg0MTQxMX0.1NR1I9JSDhoi07mWO9ESynNqUSE8t_JxGuL8540F0F0";

export const getToken = async () => {
  if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async () => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiJ9.eyJhcGlrZXkiOiIxMDExODE3Ni0yNmM3LTQzNzgtYTNiYy03Zjg1YmFkMGVlMDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfbW9kIl0sImV4cCI6MTY4Njg0MTQxMX0.1NR1I9JSDhoi07mWO9ESynNqUSE8t_JxGuL8540F0F0",
      "Content-Type": "application/json",
    },
  };

  const { roomId } = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error("error", error));

  return roomId;
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const result = await fetch(url, options)
    .then(response => response.json()) //result will have meeting id
    .catch(error => console.error("error", error));

  return result ? result.roomId === roomId : false;
};
