import React, { useRef } from 'react';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';

const ModalInscrever: React.FC = () => {
    let form = useRef();
    let modal = useRef();

    const inscreverEmail = () => {
        if (!(form.current as HTMLFormElement).checkValidity()) {
            (form.current as HTMLFormElement).classList.add('was-validated');
            return;
        }

        const formData = new FormData((form.current as HTMLFormElement));
        let urlRequest = "http://localhost:7000";
        if (import.meta.env.PROD) urlRequest = "https://vallorx.com.br/php/gestao-email.php";
        $.ajax({
            type: 'POST',
            url: urlRequest,
            timeout: 0,
            data: formData,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            success: (result) => {
                result = JSON.parse(result);
                if (result.status === '200') {
                    $('#toast-success-response-body').html(result.mensagem);
                    new bootstrap.Toast($('.toast-success')).show();
                    bootstrap.Modal.getInstance(modal.current).hide();
                } else if (result.status === '400' || result.status === '500') {
                    $('#toast-danger-response-body').html(result.mensagem);
                    new bootstrap.Toast($('.toast-danger')).show();
                }
            },
            error: (result) => {
                $('#toast-danger-response-body').html("Erro ao solicitar");
                new bootstrap.Toast($('.toast-danger')).show();

            },
            beforeSend: () => { /* antes de enviar */
                $('#btn-save').prop('disabled', true);
                $('#spinner-save').removeClass('d-none'); /* mostra o loading */
            },
            complete: () => { /* completo */
                $('#spinner-save').addClass('d-none');
                $('#btn-save').prop('disabled', false);
            }
        });
    };

    return (
        <>
            <div
                className="modal fade"
                id="inscreverEmailModal"
                tabIndex={-1}
                aria-labelledby="inscreverModalLabel"
                aria-hidden="true"
                ref={modal}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Se inscreva</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Para receber mais informações sobre nossos serviços e conteúdo, informe seu e-mail:
                            </p>

                            <form className="needs-validation" id="form-inscrever-email" ref={form}>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        aria-describedby="email"
                                        title="email"
                                        name="email"
                                        required
                                    />
                                    <div className="invalid-feedback">E-mail é obrigatório</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputNome" className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNome"
                                        aria-describedby="nome"
                                        title="nome"
                                        name="nome"
                                        required
                                    />
                                    <div className="invalid-feedback">Nome é obrigatório</div>
                                </div>
                            </form>
                            <small>Após o cadastro, você poderá se desinscrever nos e-mails recebidos por nós ou entrando em contato pelo nosso site.</small>
                        </div>
                        <div
                            className="px-3 d-none text-success"
                            id="resposta-add-news-success"
                        >
                        </div>
                        <div className="px-3 d-none text-danger" id="resposta-add-news-error">
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">Cancelar</button
                            >
                            <button type="button" className="btn btn-primary" onClick={() => inscreverEmail()} id="btn-save">
                                <span
                                    className="spinner-border spinner-border-sm d-none"
                                    role="status"
                                    aria-hidden="true"
                                    id="spinner-save"></span>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="position-fixed bottom-0 end-0 p-3"
                style={{ zIndex: "10000" }}
            >
                <div
                    className="toast toast-danger align-items-center text-white bg-danger"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body" id="toast-danger-response-body">
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
                <div
                    className="toast toast-success align-items-center text-white bg-success"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div
                            className="toast-body"
                            id="toast-success-response-body"
                        >
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalInscrever;
