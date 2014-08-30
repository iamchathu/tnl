var socket = io.connect('localhost');

var tempKeys = [];
var ShorcutKeyColor =[];
var djcuts;

socket.emit('adminLogon', {});


$("#adminon").click(function () {
    socket.emit('adminon', {});
});

socket.on('adminLogonKeyDetails', function (data) {
    saveSCKeys(data);

    propagetekeys(data);
});

function propagetekeys (data) {
    if (data.length!=0) {
        $(".shortcuts").html("");
    };
     var k =1;

     for (i = 0;i < data.length; i++) {
         var source   = $("#entry-template").html();
         var template = Handlebars.compile(source);
         var context = {id:k, s: data[i].sc  ,c:data[i].c};
         var html    = template(context);
         $(".shortcuts").append(html);
         $('.demo2').colorpicker();
         k++;
        //ShorcutKeyColor.push({'sc':keydata[i].sc,'c':keydata[i].c});
    }

    djcuts = data.length;
}

function addRow() {

    djcuts++;

    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {id:djcuts, s: "" ,c:""};
    var html    = template(context);

     $(".shortcuts").append(html);
     $('.demo2').colorpicker();

}

function clearShortcutTable() {
    document.getElementById('shortcutTable').innerHTML = '<thead><tr><th>Shortcut</th><th>Color</th></tr></thead><tbody><tr><td><input type="text" id="sc1"></td><td><input type="text" id="c1"></td></tr></tbody>';
    document.getElementById('shortcut-error-text').innerHTML = '';
}

function sendShortcuts() {
    var data = [];
        
    var data2 = [];
    for (var i = 1; i <=djcuts; i++) {
        data2.push(  {  sc:document.getElementById('sc' + i).value  ,  c: document.getElementById('c' + i).value   }   );
    }

    socket.emit("dj_module_save",data2);
    saveSCKeys(data2);
    tempKeys = [];
    //clearShortcutTable();

}

function saveSCKeys(keydata){
    for (i = 0;i < keydata.length; i++) {
        ShorcutKeyColor.push({'sc':keydata[i].sc,'c':keydata[i].c});
    }
}

var keyPress = function(key){
    for (var i=0; i < ShorcutKeyColor.length;i++) {
        if(ShorcutKeyColor[i].sc==key){
            return ShorcutKeyColor[i].c;
        }
    }
    return false;
}

//$( "html" ).keypress(function(event) {
$( "#scrach-pad" ).keypress(function(event) {
    charKey = String.fromCharCode(event.which);
    color = keyPress(charKey);
        console.log(color);
    if ( color != false ) {
       socket.emit("dj_module_send_color",color);
       $("#djpreview").css("background",color);
   }
});
