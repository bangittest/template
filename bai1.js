// bai 7_5

let stores = [{ id: 1, name: "Milk", count: 100 }, { id: 2, name: "Yakult", count: 100 }, { id: 3, name: "Butter", count: 100, }];
let carts = []

while (true) {
    // Cho người dùng nhập vào 5 chữ cái C/R/U/D/E
    let giaTriNhap = prompt("Nhap C/R/U/D/E")

    // C – Cho người dùng nhập vào tên sản phẩm muốn mua.
    if (giaTriNhap == "C") {
        let tenSanPhamMuonMua = prompt("Nhap ten san pham muon mua")

        // tìm trước hai vị trí của sản phẩm muốn mua ở trong hai mảng để lát nữa tăng giảm số lượng còn biết tăng giảm vào đâu
        let viTriTrongCart = carts.findIndex(value => value.name == tenSanPhamMuonMua)
        let viTriTrongStore = stores.findIndex(value => value.name == tenSanPhamMuonMua)

        // Nếu tìm thấy sản phẩm đã được mua ở trong cart rồi thì bây giờ tăng số lượng của sản phẩm đó trong cart lên 1 và đương nhiêm là 
        // phải giảm sản phẩm đó trong cửa hàng(store) đi 1
        if (viTriTrongCart >= 0) {
            carts[viTriTrongCart].count++
            stores[viTriTrongStore].count--
        } else { // ngược lại nếu sản phẩm muốn mua chưa từng được mua(ko tìm thấy trong cart) thì thêm sản phẩm đó vào cart
            // thông tin cần thêm là {id, name, count: 1} count phải là 1 vì đây là mới mua lần đầu
            // không được carts.push({stores[viTriTrongStore]) vì như vậy sẽ là mua hết sạch sản phẩm đó trong cửa hàng
            if (viTriTrongStore >= 0) {
                carts.push({ id: stores[viTriTrongStore].id, name: stores[viTriTrongStore].name, count: 1 })
                stores[viTriTrongStore].count--
                console.log("Store sau mua: ", stores);
                console.log("Cart sau mua: ", carts);
            } else {
                console.log("Khong co san pham nay trong cua hang");
            }
        }

    } else if (giaTriNhap == "R") {
        console.log("Stores: ", stores);
        console.log("Carts: ", carts);
    } else if (giaTriNhap == "U") {
        let viTriUpdateTrongCart;
        // dùng do while để bắt người dùng nhập đúng vị trí hợp lệ 
        do {
            viTriUpdateTrongCart = prompt("Nhap vi tri muon sua trong carts")
        } while (viTriUpdateTrongCart < 0 || viTriUpdateTrongCart > carts.length - 1)

        // sau khi nhập được vị trí rồi thì cho nhập số lượng muốn thay đổi
        let soLuongMuonThayDoi = Number(prompt("Nhap so luong muon thay doi"))

        // tìm vị trí của sản phẩm trong cửa hàng(store), tên sản phẩm muốn update sẽ bằng  carts[viTriUpdateTrongCart].name
        // dùng findIndex để tìm coi sai phẩm đó nằm đâu trong cửa hàng
        let viTriCuaSanPhamTrongStore = stores.findIndex(value => value.name == carts[viTriUpdateTrongCart].name)

        //  sau khi tìm thấy sản phẩm nằm ở đâu rồi thì chỉnh số lượng trong cửa hàng và trong giỏ hàng, sẽ xảy ra hai trường hợp
        // nếu số lượng muốn đổi lớn hơn số lượng muốn mua lúc đầu thì phải giảm bớt trong kho
        if (soLuongMuonThayDoi > carts[viTriUpdateTrongCart].count) {
            stores[viTriCuaSanPhamTrongStore].count -= (soLuongMuonThayDoi - carts[viTriUpdateTrongCart].count)
            carts[viTriUpdateTrongCart].count = soLuongMuonThayDoi
        } else { // ngược lại số lượng muốn đổi mà ít hơn thì phải trả lại số lượng thừa cho kho
            stores[viTriCuaSanPhamTrongStore].count += (carts[viTriUpdateTrongCart].count - soLuongMuonThayDoi)
            carts[viTriUpdateTrongCart].count = soLuongMuonThayDoi
        }
        console.log("Store sau update: ", stores);
        console.log("Cart sau update: ", carts);
    } else if (giaTriNhap == "D") {
        let viTriXoaTrongCart;
        // dùng do-while để tìm đúng vị trí cần xóa
        do {
            viTriXoaTrongCart = prompt("Nhap vi tri muon sua trong carts")
        } while (viTriXoaTrongCart < 0 || viTriXoaTrongCart > carts.length - 1)

        // dùng hàm splice để xóa, tham số đầu tiên là vị trí cần xóa, tham số thứ 2 là mình muốn xóa mấy phần tử tính từ vị trí bắt đầu
        carts.splice(viTriXoaTrongCart, 1)
        console.log("Cart sau xoa: ", carts);
    } else if (giaTriNhap == "E" || giaTriNhap == undefined) {
        break
    }
}