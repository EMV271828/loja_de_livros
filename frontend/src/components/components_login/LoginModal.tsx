import {Modal, ModalBody, ModalHeader} from "react-bootstrap";
import {Link} from "react-router-dom";
import LoginFormModal from "./LoginFormModal.tsx";

const LoginModal = (props: { openModal: boolean, closeModal: () => void }) => {

    return (
        <>
            <Modal show={props.openModal} onHide={props.closeModal} backdrop={"static"} keyboard={false}>
                <ModalHeader className={"modal-header"}>
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Fazer Login</h1>
                    <button type="button" className="btn-close" onClick={props.closeModal}></button>
                </ModalHeader>
                <ModalBody className={"modal-body p-5 d-flex flex-column align-items-center"}>

                    <LoginFormModal closeModal={props.closeModal}/>
                    {/*<Link to={{pathname: `/cadastrar`}} onClick={props.closeModal} className="btn btn-warning w-75">*/}
                    {/*    Não possui conta? Cadastrar*/}
                    {/*</Link>*/}
                </ModalBody>
            </Modal>

        </>
    )
}

export default LoginModal

// TODO adicionar a logica de conexao encontrada em LoginForm