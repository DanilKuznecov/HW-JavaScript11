const product = {
    plainBurger: {
        name: 'PlainBurger',
        price: 10000,
        img: 'images/product2.jpg',
        amount: 0,
        callories: 300,        
        get totalSum() {
            return this.price * this.amount
        },
        get totalCall() {
            return this.amount * this.callories
        }
    },
    freshBurger: {
        name: 'FreshBurger',
        price: 20500,
        img: 'images/product1.jpg',
        amount: 0,
        callories: 500,
        get totalSum() {
            return this.price * this.amount
        },
        get totalCall() {
            return this.amount * this.callories
        }
    },
    freshCombo: {
        name: 'FreshCombo',
        price: 31900,
        img: 'images/product3.jpg',
        amount: 0,
        callories: 600,
        get totalSum() {
            return this.price * this.amount
        },
        get totalCall() {
            return this.amount * this.callories
        }
    }
}


const headerTimer = document.querySelector('.header__timer-extra')
let count = 50      


function timerLogo(speed  = 0) { 
    headerTimer.innerHTML = speed 
    speed++      
    if(speed > 50 && speed < 75) {
        count = 50        
    }else if (speed > 75 && speed < 90) {
        count = 80
    }else if (speed > 90) {
        count = 100
    }

    if(speed <= 100) {
        setTimeout(() => {
            timerLogo(speed)
        }, count);
    }
}

timerLogo()


const order = document.querySelector('.addCart'),
    orderA = document.querySelector('.receipt'),
    orderBtn = document.querySelector('.receipt__window-btn')
    



order.addEventListener('click', () => {
    orderA.classList.add('active')
    orderA.style.display = "block"
})
orderBtn.addEventListener('click', () => {    
    orderA.classList.remove('active');
    orderA.style.display = "none" ;       
    alert('Ваш заказ принят, ожидайте звонка оператора.');     
    document.querySelectorAll('.main__product-num').forEach(item => item.innerHTML = 0);
    document.querySelectorAll('.main__product-price').forEach(item => item.innerHTML = 0);
    document.querySelectorAll('.main__product-call').forEach(item => item.innerHTML = 0)      
})



window.addEventListener('click' , (e) => {
    if(e.target.classList.contains('main__product-btn')) {
        const  attr = e.target.getAttribute('data-symbol')
        const parent = e.target.closest('.main__product')
        const parentId = parent.getAttribute('id')
        const burgers = parent.querySelector('.main__product-num');
        const totalPrice = parent.querySelector('.main__product-price');
        const totalCallories = parent.querySelector('.main__product-call')
       if(parent) {
        if(attr == '+') {
           product[parentId].amount++            
        } else if (attr == '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }
        burgers.innerHTML = product[parentId].amount
            totalPrice.innerHTML = `${product[parentId].totalSum} сум`
            totalCallories.innerHTML = `${product[parentId].totalCall} калорий `            
    } 
    }
    
    renderBasket()
})

function totalSum() {
    let total = 0
    for(const key in product) {
        total += product[key].totalSum
    }
    return `Оплатить: Общая сумма - ${total} сум`
}





function renderBasket() {
    const windowBasket = document.querySelector('.receipt__window-out')
    const productArray = []
    for(const key in product) {
        const productItem = product[key]        
        if(productItem.amount) {
            productArray.push(productItem)
        }
    }
    windowBasket.innerHTML = ''    
    productArray.forEach(item => {
        windowBasket.innerHTML += cardItemBurger(item)
    })
    
    orderBtn.innerHTML = totalSum()
}


function cardItemBurger(obj) {
    const {name, totalSum, amount, img} = obj
    return `
    <div class="checklist__product-item">
        <div class="checklist__product-info">
            <img src="${img}" alt="icon" class="checklist__product-image">
            <div class="checklist__info-burger">
                <p class="checklist__burger-name">${name}</p>
                <p class="checklist__burger-price">${totalSum} сум</p>
            </div>
        </div>
        <div class="checklist__burger-count">           
            <output class="checklist__burger-amount">${amount}</output>           
        </div>        
    </div>   
        `
    

  
}















