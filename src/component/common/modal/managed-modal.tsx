import Modal from '../modal/modal';
import {useModal } from '../../../context/modal.context';

import ProductPopup from '../../product/product-popup';

export default function ManagedModal() {
    const { modalView, selectedProduct, closeModal } = useModal();
    if (!modalView || !selectedProduct) return null;

    return (
        <Modal open={!!modalView} onClose={closeModal}>
            {modalView === 'PRODUCT_VIEW' && <ProductPopup product={selectedProduct}/>}
        </Modal>
    );
}