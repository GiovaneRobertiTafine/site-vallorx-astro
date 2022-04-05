import $ from 'jquery';
let interval;

export function getNews() {
    $.ajax({
        type: 'GET',
        url: 'https://vallorx.com.br/php/gestao-videos.php',
        cache: false,
        processData: false,
        contentType: false,
        success: (result) => {
            result = JSON.parse(result);

            if (result.status === '400' || result.status === '500') {
                $('#list-news').html(`<h3> ${result.mensagem} <h3/>`);
            } else {
                if (result.length > 0) {
                    let res = '<ul class="list-group">';
                    result.map((video) => {
                        res +=
                            `<li href="#" class="list-group-item" aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${video.Title} - ${video.FileName}</h5>
                                <img src="/assets/gestao-videos/x-square.svg" value=${video.FileName} alt="x-square" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="gestaoVideos.deleteAllOrId(this)" />
                            </div>
                            <p class="mb-1">${video.Description}</p>
                        </li>`;
                    });
                    res += '</ul>';
                    $('#list-news').html(res);
                } else {
                    $('#list-news').html(`<h3>Nenhum vídeo registrado.<h3/>`);
                }
            }
        },
        error: (result) => {
            $('#list-news').html('<h3>Infelizmente houve um erro ao solicitar!</h3>');

        },
    });
}

export function addNews() {
    resetModal();

    const form = document.getElementById('form-add');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    $('.progress').css('display', 'block');
    const myForm = document.getElementById('form-add');
    const formData = new FormData(myForm);

    $.ajax({
        type: 'POST',
        url: 'https://vallorx.com.br/php/gestao-videos.php',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: (result) => {
            result = JSON.parse(result);
            if (result.status === '200') {
                $('#resposta-add-news-success').html(result.mensagem).removeClass('d-none');
                interval = setTimeout(() => {
                    $('#resposta-add-news-success').addClass('d-none');
                }, 10000);
            } else if (result.status === '400' || result.status === '500') {
                $('#resposta-add-news-error').html(result.mensagem).removeClass('d-none');
                interval = setTimeout(() => {
                    $('#resposta-add-news-error').addClass('d-none');
                }, 10000);
            }
        },
        error: (result) => {
            $('#resposta-add-news-error').html('Infelizmente houve um erro ao solicitar!').removeClass('d-none');
            interval = setTimeout(() => {
                $('#resposta-add-news-error').addClass('d-none');
            }, 10000);

        },
        beforeSend: () => { /* antes de enviar */
            $('#btn-save').prop('disabled', true);
            $('#spinner-save').removeClass('d-none'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#form-add').trigger('reset');
            $('.progress').css('display', 'none');
            $('#spinner-save').addClass('d-none');
            $('#btn-save').prop('disabled', false);
        }

    });
}

let deleteValue = null;
export function deleteAllOrId(video = null) {
    if (video) {
        deleteValue = video.getAttribute("value");
        $('#modal-body-delete').html(`<p> Tem certeza que quer excluir o vídeo ${deleteValue} ?</p > `);
    } else {
        $('#modal-body-delete').html(`<p> Tem certeza que quer excluir todos os vídeos ?</p > `);
    }
}

export function deleteNews() {
    resetModal();

    $.ajax({
        type: 'DELETE',
        url: `https://vallorx.com.br/php/gestao-videos.php${deleteValue ? "?file_name=" + deleteValue : ''}`,
        cache: false,
        processData: false,
        contentType: false,
        success: (result) => {
            result = JSON.parse(result);
            if (result.status === '200') {
                $('#resposta-delete-news-success').html(result.mensagem).removeClass('d-none');
                interval = setTimeout(() => {
                    $('#resposta-delete-news-success').addClass('d-none');
                }, 10000);
            } else if (result.status === '400' || result.status === '500') {
                $('#resposta-delete-news-error').html(result.mensagem).removeClass('d-none');
                interval = setTimeout(() => {
                    $('#resposta-delete-news-error').addClass('d-none');
                }, 10000);
            }
        },
        error: (result) => {
            $('#resposta-delete-news-error').html('Infelizmente houve um erro ao solicitar!').removeClass('d-none');
            interval = setTimeout(() => {
                $('#resposta-delete-news-error').addClass('d-none');
            }, 10000);

        },
        beforeSend: () => { /* antes de enviar */
            $('#btn-confirm').prop('disabled', true);
            $('#spinner-confirm').removeClass('d-none'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#btn-confirm').prop('disabled', false);
            $('.progress').css('display', 'none');
            $('#spinner-confirm').addClass('d-none');
        }

    });
}

(function () {
    // your page initialization code here
    // the DOM will be available here
    const addModal = document.getElementById('addModal');
    const deleteModal = document.getElementById('deleteModal');
    addModal.addEventListener('hidden.bs.modal', resetModal);
    deleteModal.addEventListener('hidden.bs.modal', resetModal);
    getNews();
})();

function resetModal() {
    $('#resposta-add-news-success').addClass('d-none');
    $('#resposta-add-news-error').addClass('d-none');
    $('#resposta-delete-news-error').addClass('d-none');
    $('#resposta-delete-news-success').addClass('d-none');
    clearInterval(interval);
}