import $ from 'jquery';

globalThis.$ = $;

export function enviarEmail() {
    const form = document.getElementById('form-contato');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const urlData = $('#form-contato').serialize();
    $.ajax({
        type: 'POST',
        url: 'src/js/email.php',
        data: urlData,
        dataType: 'json',
        success: (result) => {
            if (result.status === '200') {
                $('#resposta-email').html(result.mensagem).show();
                setTimeout(() => {
                    $('#resposta-email').hide();
                }, 10000);
            } else if (result.status === '400') {
                $('#resposta-email').html(result.mensagem).css('color', 'red').show();
                setTimeout(() => {
                    $('#resposta-email').hide();
                }, 10000);
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