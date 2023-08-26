const porduct = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm(){
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm(){
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm(){
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm(){
            return this.price * this.amount
        }
    },
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
      baksetBtn = document.querySelector('.wrapper__navbar-btn'),
      basketModel = document.querySelector('.wrapper__navbar-basket')
      closeBasketModal = document.querySelector('.wrapper__navbar-close'),
      basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
      totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
      basketBtnCount = document.querySelector('.warapper__navbar-count'),
      btnCard = document.querySelector('.wrapper__navbar-bottom')
      print__body = document.querySelector('.print__body')
      print__footer = document.querySelector('.print__footer')
      
      
productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})      

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
    parentId = parent.getAttribute('id')
    porduct[parentId].amount++
    
    basket()
}

function basket() {
    const productArray = []
    for (const key in porduct) {
        let totalCount = 0
        const po = porduct[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        parentIndecator = productCard.querySelector('.wrapper__list-count')
        
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active')
            totalCount += po.amount
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        }else{
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
        
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    }else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalSummProduct() {
    let total = 0
    for (const key in porduct) {
        total += porduct[key].totalSumm
    }
    return total
}

function totalCountProduct() {
    let total = 0
    for (const key in porduct) {
        total += porduct[key].amount
    }
    return total
}

function cardItemBurger(productData) {
    const {name, totalSumm: price, amount, img} = productData
    return`<div class="wrapper__navbar-product" >
        <div class="wrapper__navbar-info">
            <img src="${img}" class="wrapper__navbar-productImage">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice">${price} UZS</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
            <p class="wrapper__navbar-count">${amount}</p>
            <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
        </div>
    </div>`
}

window.addEventListener('click', function (e) {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') {
                porduct[idProduct].amount--
            }else{
                porduct[idProduct].amount++
            }
            basket()
        }
    }    
})

baksetBtn.addEventListener('click', function () {
    basketModel.classList.add('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModel.classList.remove('active')
})


btnCard.addEventListener('click', function () {
    print__body.innerHTML = ''
    for (const key in porduct) {
        const {name, totalSumm, amount} = porduct[key]
        if (amount) {
            print__body.innerHTML = `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </p>
            </div>
            <p>${totalSumm}</p>
            `
            
        }
    }
    print__footer.innerHTML = totalSummProduct()
    window.print()
})