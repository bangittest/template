// localStorage.setItem("products", JSON.stringify(
//     [
//         {
//             id: 1,
//             sku: "nmdf23",
//             name: "Plane",
//             category: 2,
//             description: "A cage bear in the luggage compartment made a flight from Baghdad to Dubai to postpone an hour.",
//             unitPrice: 13.45,
//             image: "avatar.jpg"
//         },
//         {
//             id: 2,
//             sku: "jndg23",
//             name: "Tank",
//             category: 2,
//             description: "A cage bear in the luggage compartment made a ",
//             unitPrice: 23.54,
//             image: "avatar-2.jpg"
//         },
//         {
//             id: 3,
//             sku: "kien52",
//             name: "Fire Truck",
//             category: 1,
//             description: "A cage bear in the luggage compartment made a flight from Baghdad ",
//             unitPrice: 32.5,
//             image: "avatar-3.jpg"
//         },
//         {
//             id: 4,
//             sku: "lokj89",
//             name: "Police Car",
//             category: 1,
//             description: "A cage bear in the luggage compartment ",
//             unitPrice: 55.2,
//             image: "avatar-4.jpg"
//         },
//         {
//             id: 5,
//             sku: "zxew45",
//             name: "Bus",
//             category: 3,
//             description: "A cage bear in the luggage compartment made a flight from Baghdad to ",
//             unitPrice: 15.1,
//             image: "avatar-5.jpg"
//         },
//     ]
// ))

const userName = document.getElementById("user_name")
const avatar = document.getElementById("avatar")

function getNewIdOrder() {
    const orders = JSON.parse(localStorage.getItem("orders"))
    if (orders.length == 0) {
        return 1
    } else {
        let max = orders[0].orderId
        for (const order of orders) {
            if (order.orderId > max) max = order.orderId
        }
        return ++max
    }
}
function displayInforUser() {
    const idUserLogin = JSON.parse(localStorage.getItem("user_login"))
    const users = JSON.parse(localStorage.getItem("users"))
    const orders = JSON.parse(localStorage.getItem("orders"))

    const index = users.findIndex(user => user.id == idUserLogin)
    if (index == -1) {
        window.location.href = "index.html"
    } else {
        userName.innerHTML = users[index].userName
        avatar.src = `./img/${users[index].avatar}`

        const order = orders.find(order => order.userId == users[index].id)
        if (order == undefined) {
            orders.push({
                orderId: getNewIdOrder(),
                serialNumber: Math.floor(100000 + Math.random() * 999999),
                userId: idUserLogin,
                totalPrice: 0,
                status: 0,
                note: "",
                orderDetails: []
            })
            localStorage.setItem("orders", JSON.stringify(orders))
        } else {
            document.getElementById("product_count").innerHTML = order.orderDetails.length
        }
    }
}
displayInforUser()

document.getElementById("logout-button").addEventListener("click", function () {
    userName.innerHTML = ""
    avatar.src = ""
    localStorage.setItem("user_login", JSON.stringify(""))
    window.location.href = "index.html"
})

function gotoDetail() {
    window.location.href = "detail.html"
}

function drawProduct(array) {
    const producsHTML = document.getElementById("product-list")
    let stringProducts = ""

    array.forEach(product => {
        stringProducts +=
            `
            <div class="product">
                <img src="./img/${product.image}" alt="image">
                <h3>${product.name}</h3>
                <p class="price">$${product.unitPrice.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button class="buy-button" onclick="addProduct(event,'${product.sku}')">Buy</button>
            </div>
        `
    });
    producsHTML.innerHTML = stringProducts
}
function drawProductByCategory(category) {
    const products = JSON.parse(localStorage.getItem("products"))

    switch (category) {
        case 0: {
            drawProduct(products)
            break
        }
        case 1: {
            const filterProducts = products.filter(product => product.category == category)
            drawProduct(filterProducts)
            break
        }
        case 2: {
            const filterProducts = products.filter(product => product.category == category)
            drawProduct(filterProducts)
            break
        }
        case 3: {
            const filterProducts = products.filter(product => product.category == category)
            drawProduct(filterProducts)
            break
        }
        default: {
            drawProduct(products)
            break
        }
    }


}
drawProductByCategory(0)

function updateProductCount() {
    const idUserLogin = JSON.parse(localStorage.getItem("user_login"))
    const orders = JSON.parse(localStorage.getItem("orders"))

    const order = orders.find(order => order.userId == idUserLogin)
    if (order != undefined) {
        document.getElementById("product_count").innerHTML = order.orderDetails.length
    }
}

function addProduct(event, sku) {
    event.stopPropagation()

    const idUserLogin = JSON.parse(localStorage.getItem("user_login"))
    const products = JSON.parse(localStorage.getItem("products"))
    const orders = JSON.parse(localStorage.getItem("orders"))

    const order = orders.find(order => order.userId == idUserLogin)
    const itemPlaced = order.orderDetails

    const product = products.find(product => product.sku == sku)
    const index = itemPlaced.findIndex(value => value.sku == sku)
    if (index == -1) {
        itemPlaced.push({
            id: product.id,
            sku: product.sku,
            name: product.name,
            unitPrice: product.unitPrice,
            quantity: 1,
            totalPrice: product.unitPrice
        })
        localStorage.setItem("orders", JSON.stringify(orders))
        updateProductCount()
    }
}
