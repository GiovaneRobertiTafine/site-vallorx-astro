import $ from 'jquery';

export async function obterVideos() {
    $.ajax({
        type: 'GET',
        url: '/js/videos.php',
        success: (result) => {
            console.log(result);
            if (result.status === '200') {
                console.log(result.mensagem);
            } else if (result.status === '400') {
                $('#resposta-email').html(result.mensagem).css('color', 'red').show();
                setTimeout(() => {
                    $('#resposta-email').hide();
                }, 10000);
            } else if (result.status === '304') {
                console.log(result.mensagem);
            }
        },
        error: (result) => {
            $('#resposta-email').html('Infelizmente houve um erro ao enviar sua mensagem!').css('color', 'red').show();
            setTimeout(() => {
                $('#resposta-email').hide();
            }, 10000);

        },
        beforeSend: () => { /* antes de enviar */
            $('#loading').fadeIn('fast'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#loading').fadeOut('fast'); /* esconde o loading */
            // $('#form-contato')[0].reset();
        }

    });
}
