function getEmailData(obj) {
  let recipient = obj.recipient || "aramiso555riki@gmail.com"; // 宛先メールアドレス
  let subject =
    `【交通費申請：${obj.month}月分】${obj.name}` ||
    "【交通費申請：n月分】名前"; // 件名
  let body = `お疲れ様です。\n表題の通りでございます。\n\nご確認、よろしくお願い致します。`; // 本文

  //添付ファイルの取得
  // let fileId = "{ファイルID}";  // ドライブからコピー
  // let attachmentFile = DriveApp.getFileById(fileId).getBlob();

  let options = {
    // attachments :attachmentFile,
  };

  return [recipient, subject, body, options];
}

//送信用
function sendExpensesEmail(obj) {
  const [recipient, subject, body, options] = getEmailData(obj);
  GmailApp.sendEmail(recipient, subject, body, options);
}

// 下書き用
function createDrafrtEmail(obj) {
  const [recipient, subject, body, options] = getEmailData(obj);
  GmailApp.createDraft(recipient, subject, body, options);
}

function doGet(e) {
  const params = e.parameter;

  const isDraft = params.draft;

  if (isDraft) {
    createDrafrtEmail(params);
  } else {
    sendExpensesEmail(params);
  }

  let output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status: 200, message: "success!" }));

  return output;
}

function doPost(e) {
  const requestJSON = e.postData.contents;
  const requestObj = JSON.parse(requestJSON);

  const isDraft = requestObj.draft;

  if (isDraft) {
    createDrafrtEmail(requestObj);
  } else {
    sendExpensesEmail(requestObj);
  }

  let output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify({ status: 200, message: "success!" }));

  return output;
}
