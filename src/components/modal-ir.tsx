import React, { useRef } from 'react';
import * as bootstrap from 'bootstrap';

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
                            <img src="/assets/imagem-modal-rt.png" alt="imagem para modal IR" className="img-fluid" />
                            <div className="text-center mt-3">
                                <a className="btn btn-primary position-absolute" style={{ top: '285px', left: '75px' }} href="/reforma-tributaria">
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
