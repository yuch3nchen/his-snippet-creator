const date = new Date();
const today = date.toLocaleDateString("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const elements = {
  clinic: document.querySelector("#clinic-name"),
  serviceNo: document.querySelector("#service-number"),
  hisGroup: document.querySelector("#his"),
  textarea: document.querySelector("#textarea"),
  copyButton: document.querySelector(".copy"),
  clearButton: document.querySelector(".clear"),
};

const hisSnippets = [
  {
    his: "vision",
    name: "展望",
    snippet: () =>
      `您好，這裡是翔評同仁。以下事項回報\n` +
      `院所名稱：${elements.clinic.value} ${elements.serviceNo.value}\n` +
      `連絡人：診所回報\n` +
      `連絡時間：${today}\n` +
      `問題發生時間：${today}\n` +
      `問題敘述：\n\n` +
      `再請協助處理，謝謝！`,
  },
  {
    his: "realsun",
    name: "耀聖",
    snippet: () =>
      `您好，${elements.clinic.value} ${elements.serviceNo.value}\n` +
      `診所回報\n\n` +
      `再請協助處理，謝謝！`,
  },
];

function populateHisOptions(hisSnippets, hisGroup) {
  hisSnippets.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.his;
    option.innerText = el.name;
    hisGroup.appendChild(option);
  });
}

function handleHisChange(hisSnippets, elements) {
  if (elements.clinic.value === "" || elements.serviceNo.value === "") {
    elements.hisGroup.value = "";
    showError("請填入所有資料");
    return;
  }

  const selectedSnippet = hisSnippets.find(
    (el) => el.his === elements.hisGroup.value
  );
  if (selectedSnippet) {
    elements.textarea.value = selectedSnippet.snippet();
  }
}

function copyToClipboard(textarea) {
  if (textarea.value === "") {
    showError("請填入所有資料");
    return;
  }
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      alert("已複製到剪貼簿");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function showError(message) {
  const errorDiv = document.querySelector("#error-message");
  if (!errorDiv) {
    const newErrorDiv = document.createElement("div");
    newErrorDiv.id = "error-message";
    newErrorDiv.style.color = "red";
    newErrorDiv.style.marginTop = "10px";
    newErrorDiv.innerText = message;
    document.querySelector(".container").appendChild(newErrorDiv);
  } else {
    errorDiv.innerText = message;
  }
}

populateHisOptions(hisSnippets, elements.hisGroup);

elements.hisGroup.addEventListener("change", () => {
  handleHisChange(hisSnippets, elements);
});

elements.copyButton.addEventListener("click", () => {
  copyToClipboard(elements.textarea);
});

elements.clearButton.addEventListener("click", () => {
  elements.textarea.value = "";
  elements.hisGroup.value = "";
  elements.clinic.value = "";
  elements.serviceNo.value = "";
  const errorDiv = document.querySelector("#error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
});
