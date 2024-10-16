// OpenModalMenuItem.jsx
import React from 'react';
import { useModal } from '../../components/context/Modal';

function OpenModalMenuItem({
  modalComponent,
  itemText,
  onItemClick,
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <li className="menu-item">
      <button onClick={onClick}>{itemText}</button>
    </li>
  );
}

export default OpenModalMenuItem;