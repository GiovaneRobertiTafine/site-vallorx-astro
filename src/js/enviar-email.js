import * as $ from 'jquery';
export function enviarEmail() {
    console.log('asas');
    const form = document.getElementById('form-contato');

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const data = new FormData(form);

    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/js/email.php',
        data: data,
        dataType: 'json',
        processData: false,
        success: (result) => {
            if (result.status === '200') {
                $('#resposta-email').html(result.mensagem).show();
                setTimeout(() => {
                    $('#resposta-email').hide();
                }, 5000);
            } else if (result.status === '400') {
                $('#resposta-email').html(result.mensagem).css('color', 'red').show();
                setTimeout(() => {
                    $('#resposta-email').hide();
                }, 5000);
            }
        },
        error: (result) => {
            $('#resposta-email').html('Infelizmente houve um erro ao enviar sua mensagem!').css('color', 'red').show();
            setTimeout(() => {
                $('#resposta-email').hide();
            }, 5000);

        },
        beforeSend: () => { /* antes de enviar */
            $('#loading').fadeIn('fast'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#loading').fadeOut('fast'); /* esconde o loading */
            // $('#formExemplo')[0].reset();
        }

    });

}