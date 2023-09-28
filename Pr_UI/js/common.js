const userName = document.getElementById("user_name")
const avatar = document.getElementById("avatar")

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

function updateProductCount() {
    const idUserLogin = JSON.parse(localStorage.getItem("user_login"))
    const orders = JSON.parse(localStorage.getItem("orders"))

    const order = orders.find(order => order.userId == idUserLogin)
    console.log("==>", order);
    if (order != undefined) {
        console.log(order.orderDetails.length);
        document.getElementById("product_count").innerHTML = order.orderDetails.length
    }
}
