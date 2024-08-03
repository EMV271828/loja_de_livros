import {Modal, ModalBody, ModalHeader} from "react-bootstrap";
import {fotoUsuario} from "../../utils/CustomStyles.ts";
import autenticacaoUsuario from "../../utils/autenticacaoUsuario.ts";

const LogOutModal = (props: { openModal: boolean, closeModal: () => void }) => {

    const usuario = autenticacaoUsuario((s) => s.usuarioLogado)
    const logout = autenticacaoUsuario((s) => s.setUsuarioLogOut)

    const logOutDeUsuario = () => {
        props.closeModal();
        logout()
    }
    return (
        <Modal show={props.openModal} onHide={props.closeModal} backdrop={"static"} keyboard={false}>
            <ModalHeader className={"modal-header"}>
                <h1 className="modal-title fs-4" id="staticBackdropLabel">{`Olá, ${usuario}`}</h1>
                <button type="button" className="btn-close" onClick={props.closeModal}></button>
            </ModalHeader>
            <ModalBody className={"modal-body p-4 d-flex flex-column align-items-center"}>
                <div>
                    <i className={"bi bi-person-circle"} style={fotoUsuario}></i>
                </div>
                <div className={"btn btn-danger w-100"} onClick={logOutDeUsuario}>
                    Logout
                </div>
            </ModalBody>
        </Modal>
    )
}

export default LogOutModal