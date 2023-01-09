/**
 * <ul>直下に<div>を置くのはアンチパターン(動作的には問題ないらしい)
 * <ul>と<div>の間に<li>を置くようにする
 */
import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから要素を削除する関数
const deleteFromImcompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 完了リストから要素を削除する関数
const deleteFromCompleteList = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";
  // li生成
  const li = document.createElement("li");
  li.innerText = text;

  // 完了button生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  // 完了buttonクリック時イベント
  completeButton.addEventListener("click", () => {
    //  div生成
    const div = document.createElement("div");
    div.className = "list-row";
    // li生成
    const li = document.createElement("li");
    const completeText = completeButton.parentNode.firstElementChild.innerText;
    li.innerText = completeText;

    // 戻すbutton生成
    const reverseButton = document.createElement("button");
    reverseButton.innerText = "戻す";
    reverseButton.addEventListener("click", () => {
      const reverseText = reverseButton.parentNode.firstElementChild.innerText;
      createIncompleteList(reverseText);
      // 完了のToDoから削除
      deleteFromCompleteList(reverseButton.parentNode);
    });

    // divの子要素として各要素を設定
    div.appendChild(li);
    div.appendChild(reverseButton);
    // 完了リストに追加
    document.getElementById("complete-list").appendChild(div);

    // 未完了のToDoから削除
    deleteFromImcompleteList(completeButton.parentNode);
  });

  // 削除button生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 削除ボタンの親要素であるdivを削除
    deleteFromImcompleteList(deleteButton.parentNode);
  });

  // divの子要素として各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
