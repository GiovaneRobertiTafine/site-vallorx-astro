import $ from 'jquery';
import * as bootstrap from 'bootstrap';
export let emailsSelecionados = [];

export function getEmails() {
    let urlRequest = "http://localhost:7000";
    if (import.meta.env.PROD) urlRequest = "https://vallorx.com.br/php/gestao-email.php";
    $.ajax({
        type: 'GET',
        url: urlRequest,
        cache: false,
        processData: false,
        contentType: false,
        success: (result) => {
            result = JSON.parse(result);

            if (result.status === '400' || result.status === '500') {
                $('#list-emails').html(`<h3> ${result.mensagem} <h3/>`);
            } else {
                if (result.length > 0) {
                    let res = `
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="checkTodos" onclick="gestaoEmail.changeEmail(event)">
                                    </div>
                                </th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Data de Inscrição</th> 
                            </tr>
                        </thead>
                        <tbody>
                    `;
                    result.map((email) => {
                        res +=
                            `
                            <tr>
                                <td scope="col">
                                    <div class="form-check">
                                        <input class="form-check-input check-emails" type="checkbox" value="" id="check${email.Email}" onclick="gestaoEmail.changeEmail(event)">
                                    </div>
                                </td>
                                <td>${email.Email}</td>
                                <td>${email.Nome}</td>
                                <td>${email.Data_Inscricao.substring(8, 10) + '/' + email.Data_Inscricao.substring(5, 7) + '/' + email.Data_Inscricao.substring(0, 4)}</td>
                            </tr>
                            `;
                    });
                    res += `
                        </tbody>
                    </table>
                    `;
                    $('#list-emails').html(res);
                } else {
                    $('#list-emails').html(`<h3>Nenhum e-mail registrado.<h3/>`);
                }
            }
        },
        error: (result) => {
            $('#list-email').html('<h3>Infelizmente houve um erro ao solicitar!</h3>');

        }

    });
}

export function changeEmail(e) {
    const { checked, id } = e.target;
    if (id === 'checkTodos' && checked) {
        emailsSelecionados = [];
        [...document.getElementsByClassName('check-emails')].map((e) => {
            e.checked = true;
            emailsSelecionados.push(e.id.substring(5));
        });
    } else if (id === 'checkTodos') {
        emailsSelecionados = [];
        [...document.getElementsByClassName('check-emails')].map((e) => {
            e.checked = false;
        });
    } else {
        if (checked) {
            emailsSelecionados.push(e.target.id.substring(5));
        } else {
            const index = emailsSelecionados.findIndex((v) => v === e.target.id.substring(5));
            emailsSelecionados.splice(index, 1);
        }
        if (!emailsSelecionados.length) {
            document.getElementById("checkTodos").checked = false;
        }
    }

    if (emailsSelecionados.length) {
        document.getElementById("copiar-emails").disabled = false;
    } else {
        document.getElementById("copiar-emails").disabled = true;
    }
}

export function copyEmails() {
    navigator.clipboard.writeText(emailsSelecionados.join(';')).then(() => {
        $('#toast-success-response-body').html("E-mails copiados com sucesso.");
        new bootstrap.Toast($('.toast-success')).show();
    }, () => {
        $('#toast-danger-response-body').html("Não foi possível compiar os e-mails.");
        new bootstrap.Toast($('.toast-danger')).show();
    });
}

export function copyLinkUnsubscribe() {
    const lin = document.getElementById("link");
    navigator.clipboard.writeText(lin.cloneNode(true)).then(() => {
        $('#toast-success-response-body').html("<a href='http://'>Cancelar inscricao</a>");
        new bootstrap.Toast($('.toast-success')).show();
    }, () => {
        $('#toast-danger-response-body').html("Não foi possível compiar os e-mails.");
        new bootstrap.Toast($('.toast-danger')).show();
    });
}