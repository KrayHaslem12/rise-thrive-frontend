const urlString = window.location.href;
const paramString = urlString.split("?")[1];
const queryString = new URLSearchParams(paramString);
const vote_id = queryString.get("voteId");
const request_url = `https://rise-thrive.herokuapp.com/votes/verify/${vote_id}`;
const postOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

fetch(request_url, postOptions)
  .then((res) => res.json())
  .then((data) => renderData(data))
  .catch((err) =>
    alert(
      `There has been an error. Please refresh your page to try again. Alert an event coordinator if the error persists. ERROR:${err}`
    )
  );

const renderData = (data) => {
  const element = document.querySelector("#message");
  const message = document.createElement("span");
  message.innerText = `Your vote for ${data.vote.contestant.name} has been recorded.`;
  element.appendChild(message);
};
