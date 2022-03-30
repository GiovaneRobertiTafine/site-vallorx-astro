import $ from 'jquery';

export function obterVideos() {
    // $.ajax({
    //     type: 'GET',
    //     url: '/js/videos.php',
    //     success: (result) => {
    //         console.log(result);
    //         if (result.status === '200') {
    //             console.log(result);
    //         } else if (result.status === '400') {
    //             $('#resposta-email').html(result.mensagem).css('color', 'red').show();
    //             setTimeout(() => {
    //                 $('#resposta-email').hide();
    //             }, 10000);
    //         } else if (result.status === '304') {
    //             console.log(result);
    //         }
    //     },
    //     error: (result) => {
    //         console.log(result);
    //         $('#resposta-email').html('Infelizmente houve um erro ao enviar sua mensagem!').css('color', 'red').show();
    //         setTimeout(() => {
    //             $('#resposta-email').hide();
    //         }, 10000);

    //     },
    //     beforeSend: () => { /* antes de enviar */
    //         $('#loading').fadeIn('fast'); /* mostra o loading */
    //     },
    //     complete: () => { /* completo */
    //         $('#loading').fadeOut('fast'); /* esconde o loading */
    //         // $('#form-contato')[0].reset();
    //     }

    // });


    var jqxhr = $.get("/php/videos.php", (data) => {
    })
        .done((result) => {
            result = JSON.parse(result);
            console.log("done: " + result);
            if (result.status === '200') {
                result.data.map((video) => {
                    console.log(video);
                    $('#box-videos').append(
                        `
                        
                        <video controls ontrolsList="nodownload">
                            <source src="/assets/videos-news/${video}" type="video/mp4" >
                        </video>
                        `
                    );
                });
            }
        })
        .fail((err) => {
            console.log("error: " + err);
            $('#erro-videos').html(err);
        })
        .always(() => {
            // alert("finished");
        });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.always(() => {
        // alert("second finished");
    });
}
