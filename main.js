let xlsJson

window.onload = function(){
  xlsLoad("./answer.json");
};

var lineref = "http://line.me/";
if(getQueryString().ref == "line"){
    delete window.document.referrer;
    window.document.referrer = lineref;
    window.document.__defineGetter__('referrer', function () {
        return lineref;
    });
}

function xlsLoad(requestUrl){
  fetch(requestUrl)
    .then(async (result)=>{
        const data = await result.json()
        //リクエストが成功した際に実行する関数
        console.log(data.answer);
        
        xlsJson = data.answer;
        //jsonの結果をHTML出力する関数へ入力する
        Json2html(xlsJson);
      })
}

function Json2html(data){
  var html="";
  for(var i = 1;i<21;i++){
    const hint = data[i]
      html+="<div class='hintList'>";
      html+="<a href='#hintModal' data-toggle='modal' onclick='hintModalContent("+i+");''>";
      html+="<img src='img/face.png' class='listImg'/>"
      html+="<div class='hintTitle'>第"+(i)+"問</div>";
      html+="<div class='hintContents'>"+hint.hint+"</div>";
      html+="</a></div>";
    }
    $("#siteAbout").after(html);
    html="";
//  console.log($("#siteAbout"));
}

function hintModalContent(number){
  $("#hintNumber")[0].innerHTML = "第"+(number+1)+"問";
  $("#hintModalQ")[0].innerHTML = xlsJson[number].question;
  $("#hint")[0].innerHTML = xlsJson[number].hint;
  $("#answer")[0].innerHTML = "答え："+ xlsJson[number].answer;
  $("#explanation")[0].innerHTML = xlsJson[number].explanation;
  //console.log(xlsJson);
}

//URLの文字列を取得
function getQueryString(){
    var result = {};
    if( 1 < window.location.search.length ){
        var query = window.location.search.substring( 1 );
        var parameters = query.split( '&' );
        for( var i = 0; i < parameters.length; i++ ){
            var element = parameters[ i ].split( '=' );
            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );
            result[ paramName ] = paramValue;
        }
    }
    return result;
}
