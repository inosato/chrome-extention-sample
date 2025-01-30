// content.js

// 合計値を表示する要素を作成
const sumDisplay = document.createElement("div");
sumDisplay.style.position = "fixed";
sumDisplay.style.top = "10px";
sumDisplay.style.right = "10px";
sumDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
sumDisplay.style.color = "white";
sumDisplay.style.padding = "10px";
sumDisplay.style.borderRadius = "5px";
sumDisplay.style.fontSize = "16px";
sumDisplay.style.zIndex = "10000";
sumDisplay.style.display = "flex";
sumDisplay.style.alignItems = "center";
document.body.appendChild(sumDisplay);

// テキスト表示エリア
const textElement = document.createElement("span");
textElement.textContent = "合計: 0";
sumDisplay.appendChild(textElement);

// アイコン表示エリア
const iconElement = document.createElement("img");
iconElement.style.width = "24px";
iconElement.style.height = "24px";
iconElement.style.marginLeft = "8px";
sumDisplay.appendChild(iconElement);

// アイコンのパスを更新する関数
function updateIcon(sum) {
  let iconPath = chrome.runtime.getURL("icons/1.png"); // デフォルト（100未満）

  if (sum >= 100) {
    iconPath = chrome.runtime.getURL("icons/2.png"); // 100ちょうど
  }
  if (sum > 100) {
    iconPath = chrome.runtime.getURL("icons/3.png"); // 100超え
  }

  iconElement.src = iconPath;
}

// 合計値を計算して表示する関数
function updateSum() {
  let sum = 0;
  document.querySelectorAll("input[type='number'].hoge").forEach(input => {
    sum += parseFloat(input.value) || 0;
  });

  textElement.textContent = `合計: ${sum}`;
  updateIcon(sum);
}

// input の値が変わったときに合計を更新
document.addEventListener("input", (event) => {
  if (event.target.matches("input[type='number'].hoge")) {
    updateSum();
  }
});

// 初期合計値を設定
updateSum();
