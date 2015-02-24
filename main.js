var sheetId ="1_-Of24WGgGGq1SfdjqaglwN9OfMweMVbS7pMtgCmKh4";//なぞなぞデータの入ったエクセル
var xlsJson;//エクセルのデータのJson

//Spredsheetのjsonを持ってくるURL
var requestUrl = "https://spreadsheets.google.com/feeds/list/"+sheetId+"/od6/public/values?alt=json";

window.onload = function(){
  xlsLoad(requestUrl);
};

function xlsLoad(requestUrl){
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
}

function Json2html(data){
  var html="";
  for(var i = 0;i<(data.length/5);i++){
    for(var j = 0;j<5;j++){
      var n = i*5+j;
      html+="<div class='hintList'>";
      html+="<a href='#hintModal' data-toggle='modal' onclick='hintModalContent("+n+");''>";
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

function hintModalContent(number){
  $("#hintNumber")[0].innerHTML = "第"+(number+1)+"問";
  $("#hintModalQ")[0].innerHTML = xlsJson[number].gsx$question.$t;
  $("#hintModalImg")[0].src = xlsJson[number].gsx$image.$t;
  $("#hint")[0].innerHTML = xlsJson[number].gsx$hint.$t;
  $("#answer")[0].innerHTML = "答え："+ xlsJson[number].gsx$answer.$t;
  $("#explanation")[0].innerHTML = xlsJson[number].gsx$explanation.$t;
  //console.log(xlsJson);
}
