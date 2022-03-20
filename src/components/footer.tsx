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
            </div>
            <hr />
            <div className="d-lg-flex justify-content-end align-content-center w-100">
                <span className="small cursor-pointer">Desenvolvido por: Giovane Roberti Tafine</span>
            </div>

        </footer>

    );
};

export default Footer;