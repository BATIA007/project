window.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.catalog__tabs');
    const modal = document.querySelector('.modals');
    const modalInputs = document.querySelectorAll('.modal__input');
    const mobileBut = document.getElementById('mobile-but');

    mobileBut.addEventListener('click', e => {
        document.body.classList.toggle('overflow-y-hidden');
        document.querySelector('.header').classList.toggle('header-active');
        mobileBut.parentElement.classList.toggle('max-z-index');
    })
    

    for (let item of tabs) {
        const tabes = item.querySelectorAll('.catalog__tab');
        for (let tab of tabes) {
            tab.addEventListener('click', e => {
                if (!tab.classList.contains('catalog__tab-active')) {
                    for (let tab of tabes) {
                        tab.classList.remove('catalog__tab-active');
                    }
            
                    tab.classList.add('catalog__tab-active');
                }
            })
        }
    }
    
    for (let i = 0; i < modalInputs.length; i++) {
        if (modalInputs[i].type == "tel") {
            modalInputs[i].addEventListener('keydown', e => {
                if (e.key === 'Backspace') return
                /[\d$+()-\s]/.test(e.key) ? null : e.preventDefault()
            })
        }

        modalInputs[i].addEventListener('focus', e => {
            let modalInpInfo = modal.querySelectorAll('.modal__input-label');
            let modalSvg = modal.querySelectorAll('.modal__input-info');

            modalSvg[i].classList.add('modal__svg-focus');
            modalInpInfo[i].classList.add('hide-opacity');
        })

        modalInputs[i].addEventListener('blur', e => {
            let modalInpInfo = modal.querySelectorAll('.modal__input-label');
            let modalSvg = modal.querySelectorAll('.modal__input-info');

            if (modalInputs[i].value === '') {
                modalInpInfo[i].classList.remove('hide-opacity');
            }
            modalSvg[i].classList.remove('modal__svg-focus');
        })
    }
    

    
    // MODALS

    const butBuy = document.querySelectorAll('.catalog__buy');
    const reviewBut = document.querySelector('.review-open')

    const modalWindow = modal.querySelectorAll('.modals__window');
    const closeModal = modal.querySelectorAll('.close-modal');

    const cart = document.querySelector('.cart');
    const cartOpen = document.querySelector('.header__cart');
    const cartClose = document.getElementById('cart-next');
    const cartOrder = document.getElementById('cart-order');
    let cartList = cart.querySelector('.cart__list');

    const orderClose = document.querySelectorAll('.order__next')

    const handleCloseModal = (modWindow) => {
            modWindow.classList.remove('modals-active');
            document.body.classList.remove('overflow-y-hidden');
            setTimeout(() => modWindow.classList.add('scale-0'), 500)

            if (modWindow.querySelector('.modal')) {
                setTimeout(() => modWindow.querySelector('.modal__numbers').textContent = 1, 500)           
            }
    }

    const handleOpenModal = (num) => {
        modalWindow[num].classList.remove('scale-0');
        modalWindow[num].classList.add('modals-active');
            document.body.classList.add('overflow-y-hidden');
    }

    window.addEventListener('keydown', (e) => {
        for (let modWindow of modalWindow) {
            if (modWindow.classList.contains('modals-active') && e.code == 'Escape') {
                handleCloseModal(modWindow);
            }
        }
    })

    for (let close of closeModal) {
        close.addEventListener('click', e => handleCloseModal(e.target.closest('.modals__window')));
    }

    const generateLinkItem = (img, title, text) => `<li class="catalog__link">
    <span class="catalog__icon catalog__tab-svg">
        <img  loading="lazy" src="${img}" alt="catalog-icon-1">                                        
    </span>
    <div class="catalog__composition-info">
        <p class="catalog__material">${title}</p>
        <p class="catalog__structure">${text}</p>
    </div>
</li>`

    for (let but of butBuy) {
        but.addEventListener('click', event => {
            const mainModal = document.querySelector('.modal__main');
            const item = event.target.closest('.catalog__item');

            const img = item.querySelector('.catalog__image').getAttribute('src');
            const itemTitle = item.querySelector('.catalog__item-title').textContent;          
            const list = item.querySelector('.catalog__list');
            const fullPrice = item.querySelector('.catalog__full-price').textContent;
            const discountPrice = item.querySelector('.catalog__discount-price');
            const id = item.dataset.serial;
            
            

            const modalList = mainModal.querySelector('.catalog__list');
            const links = list.children;

            mainModal.setAttribute('data-serial', id);
            mainModal.querySelector('.catalog__image').setAttribute('src', img);
            mainModal.querySelector('.modal__item-title').textContent = itemTitle;
            mainModal.querySelector('.modal__full-price').textContent = fullPrice;

            modalList.innerHTML = ''
            for (let i = 0; i < links.length; i++) {
                const imgSvg = links[i].querySelector('img').getAttribute('src');
                const title = links[i].querySelector('.catalog__material').textContent;
                const text = links[i].querySelector('.catalog__structure').textContent;
                modalList.insertAdjacentHTML('beforeend', generateLinkItem(imgSvg, title, text))
            }
            
            if (discountPrice) mainModal.querySelector('.modal__discount-price').textContent = discountPrice.textContent;

            handleOpenModal(0)
        })
    }

    reviewBut ? reviewBut.addEventListener('click', e => handleOpenModal(1)) : null;

    
    cartOpen.addEventListener('click', e => {
        cart.classList.toggle('cart-active');
        if (window.innerWidth <= 1000) {
            document.body.classList.toggle('overflow-y-hidden');
            cartOpen.classList.toggle('header__cart-active');
            cartOpen.classList.toggle('max-z-index');
        }    
    })

    cartClose.addEventListener('click', e => {
        cart.classList.remove('cart-active')
        if (window.innerWidth <= 1000) {
            document.body.classList.remove('overflow-y-hidden');
            cartOpen.classList.remove('header__cart-active');
            cartOpen.classList.remove('max-z-index');
        } 
    });

    cartOrder.addEventListener('click', e => {
        handleOpenModal(3);
        cart.classList.remove('cart-active');
        if (window.innerWidth <= 1000) {
            document.body.classList.remove('overflow-y-hidden');
            cartOpen.classList.remove('header__cart-active');
            cartOpen.classList.remove('max-z-index');
        }
    })

    orderClose.forEach(ordClose => ordClose.addEventListener('click', e => handleCloseModal(e.target.closest('.modals__window'))));


    const minus = modal.querySelectorAll('.modal__minus');
    const plus = modal.querySelectorAll('.modal__plus');
    let numbers = modal.querySelectorAll('.modal__numbers')

    for (let i = 0; i < minus.length; i++) {
        minus[i].addEventListener('click', (e) => {
            numbers[i].textContent == 1 ? numbers[i].textContent = 1 : numbers[i].textContent--;
        })
    
        plus[i].addEventListener('click', (e) => {
            numbers[i].textContent++;
        })
    }


    let dropArea = modal.querySelector('.review__drag');
    let inputFile = document.getElementById('fileElem');

    inputFile.addEventListener('change', e => {
        dropArea.children[0].textContent = 'Загружено ' + inputFile.files.length + ' файла(ов).'
    })

    dropArea.addEventListener('dragover', e => {
        e.preventDefault();
        dropArea.classList.add('review__drag-over')
    })

    dropArea.addEventListener('dragleave', e => {
        e.preventDefault();
        dropArea.classList.remove('review__drag-over')
    })

    dropArea.addEventListener('drop', e => {
        e.preventDefault();
        const files = [...e.dataTransfer.files];
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        dropArea.classList.remove('review__drag-over');
        dropArea.children[0].textContent = 'Загружено ' + files.length + ' файла(ов).';
    })





    // CATALOG

    const catalog = document.querySelector('.catalog');

    if (!catalog.classList.contains('thankyou__catalog')) {
    const catalogItems = catalog.querySelector('.catalog__items');
    const catalogNone = catalog.querySelector('.catalog__none');
    const catalogElems = Array.from(catalogItems.children);
    const showAll = document.getElementById('show-all');
    let showElems = 6;
    let allShow = showElems;

    function showAllFunc() {

            catalogElems.forEach(elem => elem.classList.add('hide__catalog'));
            const elems = catalogElems.filter(elem => catalog.dataset.categories.includes(elem.dataset.category));
            const items = elems.slice(0, allShow);
            items.forEach(item => item.classList.remove('hide__catalog'))

            allShow >= elems.length ? showAll.style.display = 'none' : showAll.style.display = 'block';
            items.length == 0 ? catalogNone.style.display = 'block' : catalogNone.style.display = 'none';
    }

    showAllFunc();


    showAll.addEventListener('click', () => {
        if (catalogElems.length >= allShow) {
            allShow += showElems;
            showAllFunc();
        }
    })

    const categoryTabList = catalog.querySelector('.catalog__categories');
    const categoryTabs = Array.from(categoryTabList.children);

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            allShow = showElems;

            const prevCateg = catalog.dataset.categories;
            let categ;

            if (!tab.classList.contains('catalog__categorie-active')) {
                tab.classList.add('catalog__categorie-active');
                categ = tab.textContent.trim() + ' ' +  prevCateg;
            } else {
                tab.classList.remove('catalog__categorie-active');
                categ = prevCateg.replace(tab.textContent.trim(), '');
            }

            catalog.dataset.categories = categ.trim();
            preloadCatalog()
        })
    })


    function preloadCatalog() {
        catalogElems.forEach(elem => {
            if (!catalog.dataset.categories.includes(elem.dataset.category)) {
                elem.classList.add('hide__catalog')
            } else if (catalog.dataset.categories.includes(elem.dataset.category)) {
                elem.classList.remove('hide__catalog')
            }
            showAllFunc();
        })
    }

    }

        // CART

    let cartMilatex = {};

    if (localStorage.getItem('cartMilatex')) {
        cartMilatex = JSON.parse(localStorage.getItem('cartMilatex'));
    }

    const buyButtons = document.querySelectorAll('.modal__to-cart');

    const generateCartProduct = (id, image, name, fullPrice, discountPrice, amount = 1) => `
                            <li data-serial = "${id}" class="order__item">
                                <div class="order__image-container">
                                    <img src="${image}" class="order__image">
                                </div>
                                <div class="order__info">
                                    <h5 class="order__name">${name}</h5>
                                    <p class="order__price">
                                        <span class="order__full-price">${fullPrice}</span>
                                        ${checkDiscount(discountPrice)}
                                    </p>
                                    <div class="order__controllers">
                                        <div class="modal__quantity">
                                            <span class="modal__minus">-</span>
                                            <span class="modal__numbers cart__numbers">${amount}</span>
                                            <span class="modal__plus">+</span>
                                        </div>
                                        <span class="order__close">
                                            +
                                        </span>
                                    </div>
                                </div>
                            </li>
    `

    function checkDiscount(discount) {
        if (discount) {
            return `<span class="order__discounte-price">${discount}</span>`
        }
    }

    function addToCart(event) {
        const item = event.target.closest('.modal__main');

        const id = item.dataset.serial;
        const image = item.querySelector('.catalog__image').getAttribute('src');
        const name = item.querySelector('.modal__item-title').textContent;
        const fullPrice = item.querySelector('.modal__full-price').textContent;
        const discountPrice = item.querySelector('.modal__discount-price').textContent;
        const amount = item.querySelector('.modal__numbers').textContent;

        const objElem = {
            id: id,
            image: image,
            name: name,
            fullPrice: fullPrice,
            discountPrice: discountPrice,
            amount: amount
        }

        const prevLength = Object.keys(cartMilatex).length;
        cartMilatex[id] = objElem;
        const nextLength = Object.keys(cartMilatex).length;
        if (prevLength === nextLength) {
            const danger = document.querySelector('.danger');
            danger.classList.add('danger-active');
            setTimeout(() => danger.classList.remove('danger-active'), 4000)
            return;
        }

        cartList.insertAdjacentHTML('afterbegin', generateCartProduct(id, image, name, fullPrice, discountPrice, amount));
        orderList.insertAdjacentHTML('afterbegin', generateOrderProduct(id, image, name, fullPrice, discountPrice, amount));

        handleCloseModal(item.closest('.modals-active'));
        checkCart()
        checkOrder()

        localStorage.setItem('cartMilatex', JSON.stringify(cartMilatex));

    }


    buyButtons.forEach(but => but.addEventListener('click', event => addToCart(event)));


    function preloadCart() {
        for (let key in cartMilatex) {
            const items = cartMilatex[key];

            let id = items.id;
            let image = items.image;
            let name = items.name;
            let fullPrice = items.fullPrice;
            let discountPrice = items.discountPrice;
            let amount = items.amount;

            cartList.insertAdjacentHTML('afterbegin', generateCartProduct(id, image, name, fullPrice, discountPrice, amount));
        }
    }

    preloadCart();



    // OBSERVER CART
    
    const badge = document.querySelector('.header__badge');
    const cartAmount = cart.querySelector('.cart__amount');
    const cartPrice = cart.querySelector('.cart__price-full');
    const but1 = document.getElementById('cart-order');
    const but2 = document.getElementById('cart-order-buy');

    function checkCart() {
        const cartNone = document.querySelector('.cart__none');
        
        cartAmount.textContent = cartList.children.length + ' ШТ';
        badge.textContent = cartList.children.length;

        if (!cartList.children.length) {
            cartNone.style.display = 'block';
        } else if (cartList.children.length === 0) {
            but1.classList.add('button-disabled');
            but1.disabled = true;
            but2.classList.add('button-disabled');
            but2.disabled = true;
        } else {
            cartNone.style.display = 'none';
            but1.classList.remove('button-disabled');
            but1.disabled = false;
            but2.classList.remove('button-disabled');
            but2.disabled = false;
        }

        if (cartList.children.length > 2) {
            listHeight = cartList.children[0].scrollHeight + cartList.children[1].scrollHeight;
            cartList.style.height = listHeight + 'px'
        } else {
            cartList.style.height = 'auto';
        }


        let price = 0;
        for (let key in cartMilatex) {
            price = price + (Number(cartMilatex[key].discountPrice.replace(/[^+\d]/g, '')) * cartMilatex[key].amount);
        }

        price = price.toString();
        price = price.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');

        cartPrice.textContent = price + ' грн';

        cartList = cart.querySelector('.cart__list');

    }

    checkCart();




            // CART OPTION

            document.addEventListener('click', event => {
                for (let plus of document.querySelectorAll('.modal__plus')) {
                    if ((event.target === plus) && event.target.closest('.order__item')) plusCartItem(event)
                }
            })
    
            document.addEventListener('click', event => {
                for (let deleteItem of document.querySelectorAll('.order__close')) {
                    if ((event.target === deleteItem) && event.target.closest('.order__item')) deleteCartItem(event)
                }
            })
    
            document.addEventListener('click', event => {
                for (let minus of document.querySelectorAll('.modal__minus')) {
                    if ((event.target === minus) && event.target.closest('.order__item')) minusCartItem(event)
                }
            })
    
            function plusCartItem(event) {
    
                const item = event.target.closest('.order__item');
                const amount = item.querySelector('.modal__numbers');
                const key = item.dataset.serial;

                    const items2 = document.querySelectorAll('.order__item');
                        for (let elem of items2) {
                            const amount = elem.querySelector('.modal__numbers');
                            key == elem.dataset.serial ? amount.textContent++ : null;
                        }
        
                    cartMilatex[key].amount = amount.textContent;
                    try {
                        localStorage.setItem('cartMilatex', JSON.stringify(cartMilatex));
                    } catch (e) {
                        
                    }
                    checkCart();
                    checkOrder();
            }
        
            function minusCartItem(event) {
                const item = event.target.closest('.order__item');
                const amount = item.querySelector('.modal__numbers');
                const key = item.dataset.serial;
        
                if (amount.textContent == 1) return;

                    const items2 = document.querySelectorAll('.order__item');
                        for (let elem of items2) {
                            const amount = elem.querySelector('.modal__numbers');
                            key == elem.dataset.serial ? amount.textContent-- : null;
                        }
        
                    cartMilatex[key].amount = amount.textContent;
                    try {
                        localStorage.setItem('cartMilatex', JSON.stringify(cartMilatex));
                    } catch (e) {
        
                    }
                    checkCart();
                    checkOrder();
            }
        
            function deleteCartItem(event) {
                const item = event.target.closest('.order__item');
                const key = item.dataset.serial;
        
                item.classList.add('cart__item-delete');
                    item.addEventListener('transitionend', () => {
                        item.remove()
                        const items2 = document.querySelectorAll('.order__item');
                        for (let elem of items2) {
                            key == elem.dataset.serial ? elem.remove() : null;
                        }
                        delete cartMilatex[key];
                        try {
                            localStorage.setItem('cartMilatex', JSON.stringify(cartMilatex));
                        } catch (e) {
            
                        }
                        checkCart();
                        checkOrder();
                    });
            }



    // ORDER

    const generateOrderProduct = (id, image, name, fullPrice, discountPrice, amount) => `

    <li data-serial = "${id}" class="order__item" >
    <div class="order__image-container">
        <img src="${image}" alt="goods" class="order__image">
    </div>
    <div class="order__info">
        <h5 class="order__name">${name}</h5>
        <p class="order__price">
            <span class="order__full-price">${fullPrice} </span>
            ${checkDiscountOrder(discountPrice)}
        </p>
        <div class="order__controllers">
            <div class="modal__quantity">
                <span class="modal__minus">-</span>
                <span class="modal__numbers">${amount}</span>
                <span class="modal__plus">+</span>
            </div>
            <span class="order__close">
                +
            </span>
        </div>
    </div>
    </li>
    `

    function checkDiscountOrder(discuount) {
        if (discuount) {
            return `<span class="order__discounte-price">${discuount}</span>`
        }
    }

    const order = modal.querySelector('.order');
    const orderList = order.querySelector('.order__items');

    function preloadOrder() {
        for (let key in cartMilatex) {
            const items = cartMilatex[key];

            let id = items.id;
            let image = items.image;
            let name = items.name;
            let fullPrice = items.fullPrice;
            let discountPrice = items.discountPrice;
            let amount = items.amount;

            orderList.insertAdjacentHTML('afterbegin', generateOrderProduct(id, image, name, fullPrice, discountPrice, amount));
        }
    }

    preloadOrder()

    // OBSERVER ORDER

    let orderPrice = document.getElementById('order-price');
    let orderAllPrice = order.querySelector('.order__all-price');
    const delivery = document.getElementById('order-delivery')

    function checkOrder() {
        let listHeight;
        
        if (orderList.children.length > 2) {
            listHeight = orderList.children[0].scrollHeight + orderList.children[1].scrollHeight;
            orderList.style.height = listHeight + 'px'
            orderList.style.overflowY = 'auto';
        } else if (orderList.children.length === 0) {
            but1.classList.add('button-disabled');
            but1.disabled = true;
            but2.classList.add('button-disabled');
            but2.disabled = true;
        } else {
            orderList.style.height = 'auto';
            but1.classList.remove('button-disabled');
            but1.disabled = false;
            but2.classList.remove('button-disabled');
            but2.disabled = false;
        }

        calculateOrderPrice();
    }

    function calculateOrderPrice() {
        let price = 0;
        let orderPricing = 0;
        for (let key in cartMilatex) {
            if (cartMilatex[key].discountPrice) {
                price = price + (Number(cartMilatex[key].discountPrice.replace(/[^+\d]/g, '')) * cartMilatex[key].amount);
            } else {
                price = price + (Number(cartMilatex[key].fullPrice.replace(/[^+\d]/g, '')) * cartMilatex[key].amount);
            }
            
        }

        orderPricing = price + Number(delivery.textContent.replace(/[^+\d]/g, ''));
        orderPricing = orderPricing.toString();
        price = price.toString();
        price = price.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        orderPricing = orderPricing.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');

        orderPrice.textContent = price + ' грн';
        orderAllPrice.textContent = orderPricing + ' грн';
    }

    checkOrder()


        // SELECT
        let selectWrapers = document.querySelectorAll('.order__select');
        let deliveryText = document.getElementById('order-delivery-text');
        let deliveryPrice = document.getElementById('order-delivery')
    
        for (let select of selectWrapers) {
            let selects = select.querySelectorAll('.order__option');
            let selectActive = select.querySelector('.order__option-selected')
            let isActive = false;
    
            if (selectActive.classList.contains('select-delivery')) {
                let activeSelectText = selectActive.querySelector('.order__option-text');
                deliveryText.textContent = 'Доставка ' + activeSelectText.textContent + ':';
                deliveryPrice.textContent = selectActive.dataset.deliveryprice + ' грн';
                calculateOrderPrice();
            }
    
    
            for (let sel of selects) {
                sel.addEventListener('click', e => {
                    if (!sel.classList.contains('order__option-selected')) {
                        selectActive.classList.remove('order__option-selected');
                        sel.classList.add('order__option-selected');
                        selectActive = sel;
                        
                        
                        let offset = 0;
        
                        for (let sel of selects) {
                            if (!isActive) {
                                offset += 62;
                                select.classList.add('max-z-index')
                            } else if ( isActive) {
                                offset = 0;
                                select.classList.remove('max-z-index')
                            }
                            sel.style.top = offset + 'px';
                        }
        
                        offset = 0;
                        isActive = !isActive;
    
    
                        if (selectActive.classList.contains('select-delivery')) {
                            let activeSelectText = selectActive.querySelector('.order__option-text');
                            deliveryText.textContent = 'Доставка ' + activeSelectText.textContent + ':';
                            deliveryPrice.textContent = selectActive.dataset.deliveryprice + ' грн';
                            calculateOrderPrice();
                        }
                } else {
                    let offset = 0;
                    for (let sel of selects) {
                        
                        if (!sel.classList.contains('order__option-selected') && !isActive) {
                            select.classList.add('max-z-index')
                            offset += 62;
                        } else if (!sel.classList.contains('order__option-selected') && isActive) {
                            select.classList.remove('max-z-index')
                            offset = 0;
                        }
        
                        sel.classList.contains('order__option-selected') ? null : sel.style.top = offset + 'px';
                    }
                    offset = 0;
                    isActive = !isActive;
                }
                })
            }
        }
})