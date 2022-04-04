import $ from 'jquery';

export function addNews() {
    const form = document.getElementById('form-add');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    $('#btn-save').prop('disabled', true);
    $('.progress').css('display', 'block');
    const urlData = $('#form-add').serialize();
    var i = setInterval(function () {
        $.ajax({
            type: 'POST',
            url: 'https://vallorx.com.br/php/gestao-videos.php',
            data: urlData,
            success: (result) => {
                console.log(result);
                console.log(result.progress);
                if (result.status === '200') {
                    $('#resposta-add-news').html(result.mensagem).show();
                    clearInterval(i);
                    setTimeout(() => {
                        $('#resposta-add-news').hide();
                    }, 10000);
                } else if (result.status === '400') {
                    clearInterval(i);
                    $('#resposta-add-news').html(result.mensagem).show();
                    setTimeout(() => {
                        $('#resposta-add-news').hide();
                    }, 10000);
                }
            },
            error: (result) => {
                $('#resposta-add-news').html('Infelizmente houve um erro ao enviar sua mensagem!').show();
                setTimeout(() => {
                    $('#resposta-add-news').hide();
                }, 10000);

            },
            complete: () => { /* completo */
                $('#form-contato').trigger('reset');
                $('.progress').css('display', 'none');
            }

        });
    }, 1000);
}

const modal = document.getElementById('addModal');
modal.addEventListener('hidden.bs.modal', function (event) {
    $('#btn-save').prop('disabled', false);
});