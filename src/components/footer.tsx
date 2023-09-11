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
            <div className="d-flex align-items-center justify-content-around justify-content-lg-between w-100 px-3" style={{ height: "40px" }}>
                <a className='text-white small text-start' href="/gestao-access">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" style={{ padding: '5px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M2.24995 3.92378V11.5375C2.24997 13.944 2.97924 16.2941 4.34163 18.2779C5.70401 20.2617 7.63556 21.786 9.88166 22.6501L10.9226 23.0501C11.6158 23.3167 12.3833 23.3167 13.0765 23.0501L14.1175 22.6501C16.3636 21.786 18.2951 20.2617 19.6575 18.2779C21.0199 16.2941 21.7492 13.944 21.7492 11.5375V3.92378C21.7511 3.63728 21.6702 3.35632 21.5162 3.1147C21.3623 2.87308 21.1417 2.6811 20.8812 2.56184C18.0812 1.33967 15.0546 0.722566 11.9996 0.750905C8.94455 0.722566 5.91797 1.33967 3.11791 2.56184C2.8574 2.6811 2.63689 2.87308 2.48291 3.1147C2.32893 3.35632 2.24803 3.63728 2.24995 3.92378V3.92378Z"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M14.9994 9.75054H8.99966C8.17126 9.75054 7.49971 10.4221 7.49971 11.2505V15.7503C7.49971 16.5787 8.17126 17.2503 8.99966 17.2503H14.9994C15.8278 17.2503 16.4994 16.5787 16.4994 15.7503V11.2505C16.4994 10.4221 15.8278 9.75054 14.9994 9.75054Z"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.9996 13.5004H12.9995" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M8.99966 9.75054V8.2506C8.99966 7.45498 9.31571 6.69195 9.8783 6.12936C10.4409 5.56677 11.2039 5.25072 11.9995 5.25072C12.7952 5.25072 13.5582 5.56677 14.1208 6.12936C14.6834 6.69195 14.9994 7.45498 14.9994 8.2506V9.75054"
                                stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </a>
                <a className="small cursor-pointer text-reset" href="https://br.linkedin.com/in/mandrilla" target="_blank">Desenvolvido por: Giovane Roberti Tafine</a>
            </div>
        </footer>

    );
};

export default Footer;