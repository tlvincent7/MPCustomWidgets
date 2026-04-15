// MPModal Staff Widget - Enhanced version for dynamically loaded content
// This extends the base MPModal functionality without breaking existing uses

(function() {
  'use strict';
  
  console.log('=== MPModal Staff Widget Script Loaded ===');
  
  // Store modal instances
  const modalInstances = new Map();
  
  // Function to initialize a specific modal
  function initModal(targetId) {
    if (!modalInstances.has(targetId)) {
      const modalElement = document.querySelector(targetId);
      if (modalElement) {
        // Use the existing MPModal class from mp-modal.js
        if (typeof MPModal !== 'undefined') {
          modalInstances.set(targetId, new MPModal(modalElement));
          console.log('Modal initialized:', targetId);
        } else {
          console.error('MPModal class not found. Make sure mp-modal.js is loaded first.');
        }
      } else {
        console.error('Modal element not found:', targetId);
      }
    }
    return modalInstances.get(targetId);
  }
  
  // Event delegation for bio buttons (works with dynamic content)
  document.addEventListener('click', function(e) {
    const button = e.target.closest('[data-mp-toggle="modal"]');
    if (button) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetId = button.getAttribute('data-mp-target');
      console.log('=== Bio Button Clicked ===');
      console.log('Target ID:', targetId);
      
      // Initialize and show the specific modal
      const modal = initModal(targetId);
      if (modal) {
        // Hide all other modals first
        modalInstances.forEach((instance, id) => {
          if (id !== targetId && instance.isShown) {
            console.log('Hiding other modal:', id);
            instance.hide();
          }
        });
        
        modal.show();
        console.log('Modal shown:', targetId);
      } else {
        console.error('Could not initialize modal:', targetId);
      }
    }
  });
  
  // Listen for widget loaded event
  window.addEventListener('widgetLoaded', function(event) {
    console.log('=== Widget Loaded Event Received ===');
    console.log('Widget ID:', event.detail.widgetId);
    
    const buttons = document.querySelectorAll('[data-mp-toggle="modal"]');
    const modals = document.querySelectorAll('.mp-modal');
    
    console.log('Bio buttons found:', buttons.length);
    console.log('Modals found:', modals.length);
    
    // Log each button's target
    buttons.forEach((btn, index) => {
      const target = btn.getAttribute('data-mp-target');
      console.log(`Button ${index + 1} targets:`, target);
    });
    
    // Log each modal's ID
    modals.forEach((modal, index) => {
      console.log(`Modal ${index + 1} ID:`, modal.id);
    });
  });
  
  console.log('=== MPModal Staff Event Listeners Attached ===');
})();