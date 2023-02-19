var contestants = [];

const renderRadio = () => {
  for (let i = 0; i < contestants.length; i++) {
    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "contestant";
    radioButton.value = contestants[i].contestant_id;

    const label = document.createElement("label");
    label.textContent = contestants[i].name;

    const lineBreak = document.createElement("BR");

    radioButtonsContainer.appendChild(radioButton);
    radioButtonsContainer.appendChild(label);
    radioButtonsContainer.appendChild(lineBreak);
  }
};

const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
};

fetch("http://127.0.0.1:5000/contestant/get", requestOptions)
  .then((response) => response.json())
  .then((result) => (contestants = result))
  .then(() => renderRadio())
  .catch((error) => console.log("error", error));

const radioButtonsContainer = document.querySelector(
  "#radio-buttons-container"
);

const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", handleCLick);
function handleCLick() {
  const selected = document.getElementsByName("contestant");
  const identity = document.querySelector("#identity-verification");
  let values = { selection: "", identity: "" };

  values.identity = identity.value;

  for (i = 0; i < selected.length; i++) {
    if (selected[i].checked) values.selection = selected[i].value;
  }
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  };

  fetch("http://127.0.0.1:5000/votes", postOptions)
    .then((res) => res.json())
    .then((data) => renderData(data))
    .catch((error) =>
      alert(
        `There was a problem with your submisssion. Please try again, if the error persists contact an event coordinator. ERROR:${error}`
      )
    );
}

const renderData = (data) => {
  const element = document.querySelector("#message");
  const message = document.createElement("p");
  message.innerText = `${data.message}`;
  element.appendChild(message);
};
