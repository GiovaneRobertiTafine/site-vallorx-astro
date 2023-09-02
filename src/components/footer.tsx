import '../styles/footer.scss';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 mx-auto">
                        <img src="/assets/logoPB.png" id="logopb" alt="logoPB" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-6 mx-auto">
                        Copyright &#0169; - Todos os Direitos Reservados
                    </div>
                </div>
                <a className='text-white small' href="/gestao-access">Entrar</a>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-center justify-content-lg-end w-100" style={{ height: "40px" }}>
                <a className="small cursor-pointer text-reset " href="https://br.linkedin.com/in/mandrilla" target="_blank">Desenvolvido por: Giovane Roberti Tafine</a>
            </div>
        </footer>

    );
};

export default Footer;