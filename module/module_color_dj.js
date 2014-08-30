var djcuts=0;
var tempKeys = [];

socket.emit('working', {});

$("#adminon").click(function () {
    socket.emit('adminon', {});
});

socket.on('broadcast', function (data) {
    //broadcast(data);
});

function addRow() {

    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {id:djcuts };
    var html    = template(context);

    $(".shortcuts").html(html);
    djcuts++;

    // document.getElementById('shortcut-error-text').innerHTML = '';
    
    // var table = document.getElementById('shortcutTable');
    // var tableRows = document.getElementById('shortcutTable').getElementsByTagName('tr');


    // var prevKey = document.getElementById('sc' + (tableRows.length-1)).value;
    // var prevVal = document.getElementById('c' + (tableRows.length-1)).value;
    
    // var clean = true;
    // //check if prev box is filled
    // if (prevKey && prevVal) {
    //     //check if the pre box is not duplicated
    //     for (var i = 0; i < tempKeys.length; i++) {
    //         if (prevKey === tempKeys[i]) {
    //             clean = false;
    //             document.getElementById('shortcut-error-text').innerHTML = 'Duplicate shortcut key';
    //         }
    //     }
    // } else {
    //     clean = false;
    //     document.getElementById('shortcut-error-text').innerHTML = 'Shortcut key and value must be filled';
    // }

    // if (clean) {
    //     tempKeys.push(prevKey);
    //     var row = table.insertRow(-1);
    //     var cell1 = row.insertCell(0);
    //     var cell2 = row.insertCell(1);
    //     cell1.innerHTML = '<input type="text" id="sc' + row.rowIndex + '">';
    //     cell2.innerHTML = '<input type="text" id="c' + row.rowIndex + '">';
    // } else {
    //     document.getElementById('sc' + (tableRows.length-1)).value = '';
    //     document.getElementById('c' + (tableRows.length-1)).value = '';
    // }


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
    }
    tempKeys = [];
    socket.emit('admin_module_colordj', data2);
    clearShortcutTable();
    
}