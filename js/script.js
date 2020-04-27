'use strict';

var popupOpenButton = document.querySelector('.open-popup');
var popup = document.querySelector('.popup');
var popupOverlay = document.querySelector('.popup-overlay');
var popupCloseButton = document.querySelector('.popup__close');
var pagePartsShow = document.querySelector('.page-parts__show');
var pagePartsList = document.querySelector('.page-parts__list');
var pagePartsHide = document.querySelector('.page-parts__hide');
var addressContent = document.querySelector('.address__content');
var addressShow = document.querySelector('.address__show');
var addressHide = document.querySelector('.address__hide');
var nameField = document.querySelector('#popup-name');
var phoneField = document.querySelector('#popup-phone');
var messageField = document.querySelector('#popup-message');
var popupForm = document.querySelector('.popup__form');
var pageForm = document.querySelector('#page-form');
var popupCheckbox = document.querySelector('#popup-agreement');
var pageFormArgeement = document.querySelector('#agreement-field');
var phonePageField = document.querySelector('#tel-page');
var pageNameField = document.querySelector('#name-input');
var pageTextField = document.querySelector('#page-text');
var isStorageSupport = true;
var storageName = '';
var storagePhone = '';
var storageMessage = '';

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
  storageMessage = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
}

var handleClosePopup = function () {
  popup.classList.remove('popup--opened');
  popup.classList.add('popup--closed');
  if (popupOverlay) {
    popupOverlay.classList.remove('popup-overlay--opened');
  }
};

var handleOpenPopup = function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup--closed');
  popup.classList.add('popup--opened');
  if (popupOverlay) {
    popupOverlay.classList.add('popup-overlay--opened');
    popupOverlay.addEventListener('click', handleClosePopup);
  }

  if (storageName || storagePhone || storageMessage) {
    if (nameField) {
      nameField.value = storageName;
    }
    if (phoneField) {
      phoneField.value = storagePhone;
    }
    if (messageField) {
      messageField.value = storageMessage;
      messageField.focus();
    }
  } else if (nameField) {
    nameField.focus();
  }
};

var handleEscPress = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    handleClosePopup();
  }
};

var showPageParts = function () {
  if (pagePartsList) {
    pagePartsList.classList.remove('page-parts__list--closed');
    pagePartsList.classList.add('page-parts__list--shown');
  }
};

var hidePageParts = function () {
  if (pagePartsList) {
    pagePartsList.classList.remove('page-parts__list--shown');
    pagePartsList.classList.add('page-parts__list--closed');
  }
};

var showPagePartsShowButton = function () {
  if (pagePartsShow) {
    pagePartsShow.classList.remove('page-parts__show--hidden');
    pagePartsShow.classList.add('page-parts__show--shown');
  }
};

var hidePagePartsShowButton = function () {
  if (pagePartsShow) {
    pagePartsShow.classList.remove('page-parts__show--shown');
    pagePartsShow.classList.add('page-parts__show--hidden');
  }
};

var showPagePartsHideButton = function () {
  if (pagePartsHide) {
    pagePartsHide.classList.remove('page-parts__hide--hidden');
    pagePartsHide.classList.add('page-parts__hide--shown');
  }
};

var hidePagePartsHideButton = function () {
  if (pagePartsHide) {
    pagePartsHide.classList.remove('page-parts__hide--shown');
    pagePartsHide.classList.add('page-parts__hide--hidden');
  }
};

var handleShowPageParts = function () {
  handleHideAddress();
  hidePagePartsShowButton();
  showPagePartsHideButton();
  showPageParts();
};

var handleHidePageParts = function () {
  if (pagePartsList) {
    if (pagePartsList.classList.contains('page-parts__list--shown')) {
      hidePageParts();
      hidePagePartsHideButton();
      showPagePartsShowButton();
    }
  }
};

var showAddress = function () {
  if (addressContent) {
    addressContent.classList.remove('address__content--closed');
    addressContent.classList.add('address__content--shown');
  }
};

var hideAddress = function () {
  if (addressContent) {
    addressContent.classList.remove('address__content--shown');
    addressContent.classList.add('address__content--closed');
  }
};

var showAddressShowButton = function () {
  if (addressShow) {
    addressShow.classList.remove('address__show--hidden');
    addressShow.classList.add('address__show--shown');
  }
};

var hideAddressShowButton = function () {
  if (showAddress) {
    addressShow.classList.remove('address__show--shown');
    addressShow.classList.add('address__show--hidden');
  }
};

var showAddressHideButton = function () {
  if (addressHide) {
    addressHide.classList.remove('address__hide--hidden');
    addressHide.classList.add('address__hide--shown');
  }
};

var hideAddressHideButton = function () {
  if (addressHide) {
    addressHide.classList.remove('address__hide--shown');
    addressHide.classList.add('address__hide--hidden');
  }
};

var handleShowAddress = function () {
  handleHidePageParts();
  showAddress();
  hideAddressShowButton();
  showAddressHideButton();
};

var handleHideAddress = function () {
  if (addressContent) {
    if (addressContent.classList.contains('address__content--shown')) {
      hideAddress();
      hideAddressHideButton();
      showAddressShowButton();
    }
  }
};

var handleFormSubmit = function (evt) {
  if (!nameField.value || !phoneField.value || !messageField.value || !popupCheckbox.checked) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameField.value);
      localStorage.setItem('phone', phoneField.value);
      localStorage.setItem('message', messageField.value);
    }
  }
};

var handlePageFormSubmit = function (evt) {
  if (!pageFormArgeement.checked || !pageNameField.value || !pageTextField.value || (phonePageField.value.length < 14)) {
    evt.preventDefault();
  }
};

if (popupOpenButton) {
  popupOpenButton.addEventListener('click', handleOpenPopup);
}

if (popupCloseButton) {
  popupCloseButton.addEventListener('click', handleClosePopup);
}

if (popupForm) {
  popupForm.addEventListener('submit', handleFormSubmit);
}

if (pageForm) {
  pageForm.addEventListener('submit', handlePageFormSubmit);
}

if (phoneField) {
  phoneField.addEventListener('focus', function () {
    if (!phoneField.value) {
      phoneField.value = '+7(';
    }
    phonePageField.addEventListener('input', function () {
      if (phoneField.value.length === 6) {
        if (!phoneField.value.includes(')')) {
          phoneField.value = phoneField.value + ')';
        }
      }
    });
  });
}

if (phonePageField) {
  phonePageField.addEventListener('focus', function () {
    if (!phonePageField.value) {
      phonePageField.value = '+7(';
    }

    phonePageField.addEventListener('input', function () {
      if (phonePageField.value.length === 6) {
        if (!phonePageField.value.includes(')')) {
          phonePageField.value = phonePageField.value + ')';
        }
      }
    });
  });
}

window.addEventListener('keydown', handleEscPress);

if (pagePartsShow) {
  pagePartsShow.addEventListener('click', handleShowPageParts);
}

if (pagePartsHide) {
  pagePartsHide.addEventListener('click', handleHidePageParts);
}

if (addressShow) {
  addressShow.addEventListener('click', handleShowAddress);
}

if (addressHide) {
  addressHide.addEventListener('click', handleHideAddress);
}
