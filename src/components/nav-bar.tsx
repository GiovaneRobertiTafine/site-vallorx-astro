import '../styles/nav-bar.scss';
import { Pages } from '../utils/pages.enum';
import React, { useEffect, useState } from 'react';
import Time from './time';
import ModalInscrever from './modal-inscrever.jsx';
import * as bootstrap from 'bootstrap';

const NavBar: React.FC<{ pageActive: number; }> = ({ pageActive }) => {
    const [screenWidth, setScreenWidth] = useState(false);
    const [viewTime, setViewTime] = useState(false);

    const handleResize = () => {
        window.screen.width > 991 ? setScreenWidth(true) : setScreenWidth(false);
    };

    const handleViewTime = (event?) => {
        if (event?.path?.indexOf(document.querySelector('#time-link')) < 0 &&
            event?.path?.indexOf(document.querySelector('.box-time')) < 0
        ) {
            setViewTime(false);
        } else if (!event) {
            !viewTime ? setViewTime(true) : setViewTime(false);
        }
    };


    useEffect(() => {
        window.screen.width > 991 ? setScreenWidth(true) : setScreenWidth(false);
        window.addEventListener("resize", handleResize);
        window.addEventListener("click", handleViewTime);
        sessionStorage.removeItem('vallorx-modal-inscreverse');
        window.addEventListener('mousemove', (event) => {
            if (event.clientY < 5 && !sessionStorage.getItem('vallorx-modal-inscreverse')) {
                sessionStorage.setItem('vallorx-modal-inscreverse', 'active');
                console.log('active');
                var myModal = new bootstrap.Modal(document.getElementById('inscreverEmailModal'));
                myModal.show();
            }
        });
    }, []);

    function pageLinkServicos(id: string) {
        if (pageActive === Pages.SERVICOS) {
            return id;
        } else {
            return '/servicos' + id;
        }
    }

    return (
        <>
            <ModalInscrever />
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light position-absolute w-100">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="/assets/logo.png" alt="logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className={pageActive === Pages.HOME ? "nav-link active" : "nav-link"} aria-current="page" href="/">Home</a>
                                </li>
                                {(screenWidth) ?
                                    <li className="nav-item dropdown">
                                        <a className={pageActive === Pages.SERVICOS ? "nav-link dropdown-toggle active" : "nav-link dropdown-toggle"} href="/servicos" id="navbarDropdownMenuLink" role="button" aria-expanded="false">
                                            Serviços
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><a className="dropdown-item" href={pageLinkServicos('#contabil')}>Contabil</a></li>
                                            <li><a className="dropdown-item" href={pageLinkServicos('#tributaria')}>Tributaria</a></li>
                                            <li><a className="dropdown-item" href={pageLinkServicos('#export-import')}>Export | Import</a></li>
                                            <li><a className="dropdown-item" href={pageLinkServicos('#outsourcing')}>Outsourcing</a></li>
                                            <li><a className="dropdown-item" href={pageLinkServicos('#patrimonial')}>Patrimonial</a></li>
                                            <li><a className="dropdown-item" href={pageLinkServicos('#expatriados')}>Expatriados</a></li>
                                        </ul>
                                    </li>
                                    :
                                    <a className={pageActive === Pages.SERVICOS ? "nav-link active" : "nav-link"} href="/servicos" id="navbarDropdownMenuLink" role="button" aria-expanded="false">
                                        Serviços
                                    </a>
                                }
                                <li className="nav-item">
                                    <a className={pageActive === Pages.PARCEIROS ? "nav-link active" : "nav-link"} aria-current="page" href="/parceiros">Parceiros</a>
                                </li>
                                <li className="nav-item">
                                    <a className={pageActive === Pages.CONTATO ? "nav-link active" : "nav-link"} aria-current="page" href="/contato">Contato</a>
                                </li>
                                <li className="nav-item">
                                    <a className={pageActive === Pages.NEWS ? "nav-link active" : "nav-link"} aria-current="page" href="/news">News</a>
                                </li>
                                {(screenWidth) ?
                                    <li className="nav-item">
                                        <div className="nav-link" id="time-link" onClick={() => handleViewTime()}>
                                            <img src="/assets/svg/clock.svg" alt="time" />
                                        </div>
                                    </li>
                                    :
                                    null
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <Time viewTime={viewTime} changeViewTime={handleViewTime} />

            </header >
        </>
    );
};

export default NavBar;
