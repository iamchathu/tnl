var socket = io.connect('localhost');

var tempKeys = [];
var ShorcutKeyColor =[];

socket.emit('adminLogon', {});


$("#adminon").click(function () {

    socket.emit('adminon', {});
});

socket.on('adminLogonKeyDetails', function (data) {
    saveSCKeys(data);
});

socket.on('broadcast', function (data) {
    //broadcast(data);
});

function addRow() {
    document.getElementById('shortcut-error-text').innerHTML = '';
    
    var table = document.getElementById('shortcutTable');
    var tableRows = document.getElementById('shortcutTable').getElementsByTagName('tr');


    var prevKey = document.getElementById('sc' + (tableRows.length-1)).value;
    var prevVal = document.getElementById('c' + (tableRows.length-1)).value;
    
    var clean = true;
    //check if prev box is filled
    if (prevKey && prevVal) {
        //check if the pre box is not duplicated
        for (var i = 0; i < tempKeys.length; i++) {
            if (prevKey === tempKeys[i]) {
                clean = false;
                document.getElementById('shortcut-error-text').innerHTML = 'Duplicate shortcut key';
            }
        }
    } else {
        clean = false;
        document.getElementById('shortcut-error-text').innerHTML = 'Shortcut key and value must be filled';
    }

    if (clean) {
        tempKeys.push(prevKey);
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = '<input type="text" id="sc' + row.rowIndex + '">';
        cell2.innerHTML = '<input type="text" id="c' + row.rowIndex + '">';
    } else {
        document.getElementById('sc' + (tableRows.length-1)).value = '';
        document.getElementById('c' + (tableRows.length-1)).value = '';
    }


}

function clearShortcutTable() {

    document.getElementById('shortcutTable').innerHTML = '<thead><tr><th>Shortcut</th><th>Color</th></tr></thead><tbody><tr><td><input type="text" id="sc1"></td><td><input type="text" id="c1"></td></tr></tbody>';
    document.getElementById('shortcut-error-text').innerHTML = '';
}

function sendShortcuts() {
    var table = document.getElementById('shortcutTable').getElementsByTagName('tr');
    var str = "";
    var data = [];
    
    var data2 = [];
    for (var i = 1; i < table.length; i++) {

        data2.push(  {  sc:document.getElementById('sc' + i).value  ,  c: document.getElementById('c' + i).value   }   );
        data.push(document.getElementById('sc' + i).value + ' || ' + document.getElementById('c' + i).value);
        //push to ShortCutKey key value store

    }

    console.log("111111");
    socket.emit("dj_module_save",data2);
    console.log(data2.length);
    saveSCKeys(data2);
    tempKeys = [];
  //  socket.emit('admin_module_colordj', data2);
  clearShortcutTable();

}

function saveSCKeys(keydata){
    for (i = 0;i < keydata.length; i++) {
        ShorcutKeyColor.push({'sc':keydata[i].sc,'c':keydata[i].c});

        console.log(ShorcutKeyColor);
    }
}

var keyPress = function(key){
    console.log(ShorcutKeyColor);
    for (var i=0; i < ShorcutKeyColor.length;i++) {
        console.log(ShorcutKeyColor[i]);
        if(ShorcutKeyColor[i].sc==key){
            return ShorcutKeyColor[i].c;
        }
    }
    return false;
}

$( "html" ).keypress(function(event) {
    charKey = String.fromCharCode(event.which);
    color = keyPress(charKey);
    if ( color != false ) {
       console.log(color);
       socket.emit("dj_module_send_color",color);
   }
});
