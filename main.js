var sheetId ="1_-Of24WGgGGq1SfdjqaglwN9OfMweMVbS7pMtgCmKh4";//なぞなぞデータの入ったエクセル
var xlsJson;//エクセルのデータのJson

//ページの読み込みが終わったら読み込まれる関数
window.onload = function(){
  (window.innerWidth/6.4 > 100)? $("#bottomNav")[0].style.height=150 : $("#bottomNav")[0].style.height=(window.innerWidth/6.4)+50;
};

//Spredsheetのjsonを持ってくる
var requestUrl = "https://spreadsheets.google.com/feeds/list/"+sheetId+"/od6/public/values?alt=json";
$.get(requestUrl,
  {dataType:"json"},
  function(data){
    //リクエストが成功した際に実行する関数
    //console.log(data);
    xlsJson = data.feed.entry;
    //jsonの結果をHTML出力する関数へ入力する
    Json2html(xlsJson);
  }
);

function Json2html(data){
  var html="";
  for(var i = 0;i<(data.length/5);i++){
    for(var j = 0;j<5;j++){
      var n = i*5+j;
      html+="<div class='hintList'>";
      html+="<a href='#hintModal' data-toggle='modal' onclick='hintModalContent("+(n+1)+");''>";
      html+="<img src='"+data[n].gsx$image.$t+"' class='listImg'/>";
      html+="<div class='hintTitle'>第"+(n+1)+"問</div>";
      html+="<div class='hintContents'>"+data[n].gsx$comment.$t+"</div>";
      html+="</a></div>";
    }
    $("#iconAd"+i).before(html);
    html="";
  }
//  console.log($("#siteAbout"));
}
