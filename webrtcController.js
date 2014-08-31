navigator.getWebcam = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

// Peerjs content

var peer = new Peer({
    key: 'mv007pe6rw7phkt9',
    debug: 3,
    config: {
        'iceServers': [
            {
                url: 'stun:stun.l.google.com:19302'
            },
            {
                url: 'stun:stun1.l.google.com:19302'
            },
            {
                url: 'turn:numb.viagenie.ca',
                username: "lisa@learnfromlisa.com",
                credential: "22paris22"
            }
    ]
    }
});

// On open, set the peer id
peer.on('open', function () {
    $('#my-id').text(peer.id);
});

peer.on('call', function (call) {
    // Answer call automatically
    call.answer(window.localStream);
    step3(call, null);
})

// Click handlers setup
$(function () {
    $('#make-call').click(function () {
        // Initiate call
        var callerId = $('#callto-id').val();
        var call = peer.call(callerId, window.localStream);
        step3(call, callerId);
    });

    $('end-call').click(function () {
        window.existingCall.close();
        step2();
    });

    // Retry if fails
    $('#step1-retry').click(function () {
        $('#step1-error').hide();
        step();
    });

    // Video click event
    $('.video').click(function () {

        $(this).animate({
            width: '100%'
        }, 500);

        $(this).animate({
            height: 'auto'
        }, 500);
    });

    // Get started
    step1();
})

function step1() {
    // Get webcam
    navigator.getWebcam({
        audio: false,
        video: true
    }, function (stream) {
        // Display video stream
        $('#my-video').prop('src', URL.createObjectURL(stream));

        window.localStream = stream;
        step2();
    }, function () {
        $('#step1-error').show();
    });
}


function step2() {
    // Adjust the UI
    $('#step1').hide();
    $('#step3').hide();
    $('#step2').show();
}

function step3(call, peerId) {
    // Hang up on the existing call if present
    if (window.existingCall) {
        window.existingCall.close();
    }

    // Wait for the stream on, then setup peer video
    call.on('stream', function (stream) {
        $('#remotes').append("<video muted='true' src='" + URL.createObjectURL(stream) + "' autoplay class='video'></video>");
        $('#their-id').append();
        //        $('#their-video').prop('src', URL.createObjectURL(stream));
    });

    $('#step1', '#step2').hide();
    $('#step3').show();
}