import React from 'react';
import {useModal} from "../../../contexts";


const PopupAlert : React.FC = () => {
    const { closeModal, message } = useModal();
    return (
        <div className="md:w-[500px]  p-10 bg-white text-center rounded-xl">
            <p className={"mb-10"}>{message}</p>
            <button
                onClick={closeModal}
                className="inline-block leading-6 px-8 py-2 rounded-full border border-gray-500 text-sm font-medium items-center justify-center hover:bg-gray-700 hover:border-gray-700 hover:text-white"
            >
                <span className="cmp-button__text c-button__text ">CLOSE</span>
            </button>
        </div>
    );

}
export default PopupAlert;