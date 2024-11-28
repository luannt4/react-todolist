import Modal from '../modal/modal';
import {useModal } from '../../../contexts';

import ProductPopup from '../../product/product-popup';
import LoginForm from '../../auth/LoginForm';
import PopupAlert from "./popup-alert";

export default function ManagedModal() {
    const { modalView, closeModal } = useModal();

    return (
        <Modal open={!!modalView} onClose={closeModal}>
            {modalView === 'PRODUCT_VIEW' && <ProductPopup/>}
            {modalView ==='LOGIN_VIEW' && <LoginForm/>}
            {modalView ==='ALERT_VIEW' && <PopupAlert/>}
        </Modal>
    );
}