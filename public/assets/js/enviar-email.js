
function enviarEmail() {
    console.log('asas');
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('click', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();

                }

                form.classList.add('was-validated');

                var urlData = jQuery('#form-contato').serialize();
                console.log(urlData);
                $.ajax({
                    type: 'POST',
                    url: '../js/email.php',
                    data: urlData,
                    dataType: 'json',
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
                        $('#formExemplo')[0].reset();
                    }

                });

            }, false);
        });
}