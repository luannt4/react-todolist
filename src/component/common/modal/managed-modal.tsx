import Modal from '../modal/modal';
import {
  useModalAction,
  useModalState,
} from './../../../context/modal/modal.context';

import ProductPopup from '../../product/product-popup';

export default function ManagedModal() {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();


  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'PRODUCT_VIEW' && <ProductPopup />}
      
    </Modal>
  );
}