import {Modal, ModalBody, ModalHeader} from "react-bootstrap";


const ModalBuscaVazia = (props: { closeModal: boolean, handleModal: () => void }) => {

    return (
        <>
            <Modal show={props.closeModal} onHide={props.handleModal} backdrop={"static"} keyboard={false}>
                <ModalHeader className={"modal-header"}>
                    <h2 className={"modal-title fs-5"}> Campo de busca vazio!</h2>
                </ModalHeader>
                <ModalBody className={"modal-body d-flex flex-column align-items-center"}>
                    <div className={"mb-4 fs-5"}> Digite um valor para iniciar uma busca </div>
                    <button type="button" className="btn btn-warning w-75 mb-3" onClick={props.handleModal}>Fechar
                    </button>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalBuscaVazia