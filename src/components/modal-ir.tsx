import React, { useRef } from 'react';
import $ from 'jquery';
import * as bootstrap from 'bootstrap';

const ModalIr: React.FC = () => {
    let modal = useRef();
    return (
        <>
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
                            <img src="/assets/ir-img-modal.webp" alt="imagem para modal IR" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ModalIr;
