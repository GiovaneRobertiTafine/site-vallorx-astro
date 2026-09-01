import React, { useRef } from 'react';

const ModalIr: React.FC = () => {
    const modal = useRef<HTMLDivElement>(null);

    return (
        <>
            <style>{`
                iframe {
                    .main-content {
                        overflow: hidden !important;
                    }
                }
                    .link-form-rt {
                        position: absolute;
                        top: 65%;
                        left: 12%;
                        padding: 0.20rem 0.45rem;
                        font-size: 0.5rem;

                        @media (min-width: 375px) {
                            padding: 0.20rem 0.45rem;
                            font-size: 0.5rem;
                            top: 65%;
                            left: 10%;
                        }
                        @media (min-width: 768px) {
                            padding: 0.25rem 0.5rem;
                            font-size: 0.75rem;
                            left: 10%;
                            top: 70%;
                        }
                        @media (min-width: 992px) {
                            padding: 0.25rem 0.5rem;
                            font-size: 1rem;
                            left: 9%;
                        }
                    }
            `}</style>
            <div
                className="modal fade"
                id="irModal"
                tabIndex={-1}
                aria-labelledby="irModalLabel"
                aria-hidden="true"
                ref={modal}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="irModalLabel"></h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <picture>
                                <source
                                    srcSet="/assets/imagem-modal-rt-766x365.webp"
                                    type="image/webp"
                                />

                                <img
                                    src="/assets/imagem-modal-rt-766x365.webp"
                                    width="766"
                                    height="365"
                                    alt="Reforma Tributária"
                                    loading="lazy"
                            />
                            </picture>
                            <div className="text-center mt-3">
                                <a className="btn btn-primary link-form-rt" href="/reforma-tributaria">
                                    Solicite um Diagnóstico Gratuito!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default ModalIr;
