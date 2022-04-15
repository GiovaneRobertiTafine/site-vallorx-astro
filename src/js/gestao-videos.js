import $ from 'jquery';
import * as bootstrap from 'bootstrap';
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
                                <button type="button" class="btn" value="${video.FileName}" alt="x-square" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="gestaoVideos.deleteAllOrId(this)" title="del">
                                    <img class="icons-header" src="/assets/svg/x-square.svg" alt="x-circle">
                                </button>
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

        }

    });
}

export function addNews() {
    resetModal();

    const form = document.getElementById('form-add');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const myForm = document.getElementById('form-add');
    const formData = new FormData(myForm);

    $.ajax({
        type: 'POST',
        url: 'https://vallorx.com.br/php/gestao-videos.php',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        xhr: () => {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", (evt) => {
                if (evt.lengthComputable) {
                    let percentComplete = (evt.loaded / evt.total) * 100;
                    $('.progress-bar').width(percentComplete + '%');
                    //Do something with upload progress here
                }
            }, false);
            return xhr;
        },
        success: (result) => {
            result = JSON.parse(result);
            if (result.status === '200') {
                activeToastSuccess(result.mensagem);
                hideModal('addModal');
                getNews();
            } else if (result.status === '400' || result.status === '500') {
                activeToastDanger(result.mensagem);
            }
        },
        error: (result) => {
            activeToastDanger('Erro ao solicitar');

        },
        beforeSend: () => { /* antes de enviar */
            $('.progress').removeClass('d-none');
            $('#btn-save').prop('disabled', true);
            $('#spinner-save').removeClass('d-none'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#form-add').trigger('reset');
            $('.progress-bar').width('0%');
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
        $('#modal-body-delete').html(`<p> Tem certeza que quer excluir o vídeo ${deleteValue} ?</p> `);
    } else {
        $('#modal-body-delete').html(`<p> Tem certeza que quer excluir todos os vídeos ?</p> `);
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
                activeToastSuccess(result.mensagem);
                hideModal('deleteModal');
                getNews();
            } else if (result.status === '400' || result.status === '500') {
                activeToastDanger(result.mensagem);
            }
        },
        error: (result) => {
            activeToastDanger('Infelizmente houve um erro ao solicitar!');

        },
        beforeSend: () => { /* antes de enviar */
            $('#btn-confirm').prop('disabled', true);
            $('#spinner-confirm').removeClass('d-none'); /* mostra o loading */
        },
        complete: () => { /* completo */
            $('#btn-confirm').prop('disabled', false);
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

function activeToastSuccess(message = '') {
    $('#toast-success-response-body').html(message);
    new bootstrap.Toast($('.toast-success')).show();
}

function activeToastDanger(message = '') {
    $('#toast-danger-response-body').html(message);
    new bootstrap.Toast($('.toast-danger')).show();
}

function hideModal(id) {
    const modal = document.querySelector('#' + id);
    bootstrap.Modal.getInstance(modal).hide();
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}
