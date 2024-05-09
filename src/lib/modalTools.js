"use client";

export function openModalDOM(modalId) {
   const modal = document.getElementById(modalId);
   modal.showModal();
}

export function closeModalDOM(modalId) {
   const modal = document.getElementById(modalId);
   modal.close();
}
