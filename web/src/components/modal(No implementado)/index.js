// npm install --save react-modal
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Establece el elemento raíz de la aplicación para acceder a los estilos de modal

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={() => openModal('¡Confirmación exitosa!')}>Mostrar Confirmación</button>
            <button onClick={() => openModal('¡Error! Algo salió mal.')}>Mostrar Error</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Ejemplo de Modal"
            >
                <div>
                    <p>{modalContent}</p>
                    <button onClick={closeModal}>Cerrar</button>
                </div>
            </Modal>
        </div>
    );
};
