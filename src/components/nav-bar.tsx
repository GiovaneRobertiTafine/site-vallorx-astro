import '../styles/nav-bar.scss';
import { Pages } from '../utils/pages.enum';
import React, { useMemo, useEffect, useState } from 'react';

const NavBar: React.FC<{ pageActive: number; }> = ({ pageActive }) => {
    const [screenWidth, setScreenWidth] = useState(false);

    const handleResize = () => {
        window.screen.width > 768 ? setScreenWidth(true) : setScreenWidth(false);
    };

    useEffect(() => {
        window.screen.width > 768 ? setScreenWidth(true) : setScreenWidth(false);
        window.addEventListener("resize", handleResize);

    }, []);

    function pageLinkServicos(id: string) {
        if (pageActive === Pages.SERVICOS) {
            return id;
        } else {
            return '/servicos' + id;
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                            <li className="nav-link">{screenWidth.toString()}</li>
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
                                        <li><a className="dropdown-item" href={pageLinkServicos('#extrajudicial')}>Extrajudicial</a></li>
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
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default NavBar;
