// ==UserScript==
// @name         4399flash游戏下载
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  绕过实名认证，从4399的游戏游玩页面直接下载swf文件；本地运行需要从https://fpdownload.macromedia.com/pub/flashplayer/updaters/32/flashplayer_32_sa.exe下载独立播放器
// @author       fakepheonix https://github.com/fakepheonix
// @match        *://*.4399.com/flash/*
// @connect      sda.4399.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cnblogs.com
// @grant        GM.xmlHttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {Promise}
   */
  function getBlob(url) {
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: "GET",
        url: url,
        responseType: "blob",
        onload: (response) => {
          resolve(response.response);
        },
      });
    });
  }

  /**
   * 保存
   * @param  {Blob} blob
   * @param  {String} filename 文件名
   */
  function saveAs(blob, filename) {
    const link = document.createElement("a");
    const body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }

  /**
   * 下载
   * @param  {String} url 目标文件地址
   * @param  {String} filename 文件名
   */
  function download(url, filename) {
    getBlob(url).then((blob) => {
      saveAs(blob, filename);
    });
  }

  unsafeWindow.download = download;

    $(".sdkDialog").remove();
    $(".cmMask").remove();

    unsafeWindow.downloadlink = "https://sda.4399.com/4399swf" + unsafeWindow._strGamePath;
    unsafeWindow.swfname = unsafeWindow.game_title +".swf";
    $("#down_a").attr("href", "javascript:void(0);");
    $("#down_a").attr(
        "onclick",
        "window.download(downloadlink, swfname); return false;"
    );
})();