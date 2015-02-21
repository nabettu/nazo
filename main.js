var sheetId ="1_-Of24WGgGGq1SfdjqaglwN9OfMweMVbS7pMtgCmKh4";//なぞなぞデータの入ったエクセル

//ページの読み込みが終わったら読み込まれる関数
window.onload = function(){
  $("#bottomNav")[0].style.height=(window.innerWidth/6.4)+50;
};

//Spredsheetのjsonを持ってくる
var requestUrl = "https://spreadsheets.google.com/feeds/list/"+sheetId+"/od6/public/values?alt=json";
$.get(requestUrl,
  {dataType:"json"},
  function(data){
    //リクエストが成功した際に実行する関数
    //console.log(data);
    //jsonの結果を配列へ成形し、HTML出力する関数へ入力する
    Json2array(data.feed.entry);
  }
  );

function Json2array(data){
  for(var i = 0;i<data.length;i++){
    console.log(data[i]);

  }
}
