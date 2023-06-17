const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhcGlrZXkiOiIxMDExODE3Ni0yNmM3LTQzNzgtYTNiYy03Zjg1YmFkMGVlMDAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIiwiYWxsb3dfbW9kIl0sImV4cCI6MTY4Njk0MTY4OX0.0FIeTtPJQZX6PqbVLivXNXoJ3hn5sHbS5fjjNU0S__o";

export const getToken = async () => {
  if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
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
