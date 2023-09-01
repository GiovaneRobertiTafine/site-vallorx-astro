import $ from 'jquery';
import * as bootstrap from 'bootstrap';
export let emailsSelecionados = [];

export function getEmails() {
    $.ajax({
        type: 'GET',
        url: 'https://vallorx.com.br/php/gestao-email.php',
        cache: false,
        processData: false,
        contentType: false,
        success: (result) => {
            console.log(result);
            console.log(process.env.PASSWORD);
            console.log(import.meta.env.PASSWORD);
            return;
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

(function () {
    const isProd = import.meta.env.VITE_SENHA_SECRETA;
    const isDev = import.meta.env.PUBLIC_TODOS;
    console.log(isProd, isDev, import.meta.env.PROD, import.meta.env.DEV);
    getEmails();
    document.getElementById("copiar-emails").disabled = true;
    if (import.meta.env.DEV) {
        console.log();
    }
})();

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