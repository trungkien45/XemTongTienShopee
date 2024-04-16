// CODE THONG KE SHOPEE
var tongDonHang = 0;
var tongTienTietKiem = 0;
var tongTienHang = 0;
var tongTienHangChuaGiam = 0;
//var tongTienHoan = 0;
var tongSanPhamDaMua = 0;
var trangThaiDonHangConKhong = true;
var offset = 0;
//shopee cho fetch 20 đơn tối đa
var si = 20;

function xemBaoCaoThongKe() {
    var orders = [];

    function handleResponse() {
        if (this.readyState == 4 && this.status == 200) {
			next = JSON.parse(this.responseText)['data']['next_offset'];
			if(next > 0) {
				orders = JSON.parse(this.responseText)['data']['details_list'];
				tongDonHang += orders.length;
				trangThaiDonHangConKhong = orders.length >= si;
				orders.forEach(order => {
					let t31 = order['info_card']['final_total'] / 100000;
					//let rp = t31/100*20;
					//if (rp > 40000) rp = 40000;
					tongTienHang += t31;
					//tongTienHoan += rp;
					let tongChuaGiamTrongDon = 0;
					order['info_card']['order_list_cards'].forEach(item => {
						item['product_info']['item_groups'].forEach(itemGroups => {
							itemGroups['items'].forEach(data => {
								let t5 = data["order_price"] / 100000;
								tongSanPhamDaMua += data["amount"];
								tongTienHangChuaGiam += t5;
								tongChuaGiamTrongDon += t5;
							});
						});
					});
					if(t31 < tongChuaGiamTrongDon)
						console.log("hớ")
				});
				offset += si;
			}
			else{
				trangThaiDonHangConKhong = false;
			}
            if (trangThaiDonHangConKhong) {
                console.log('Đã thống kê được: ' + tongDonHang + ' đơn hàng. Đang lấy thêm dữ liệu....');
                xemBaoCaoThongKe();
            } else {
                tongTienTietKiem = tongTienHangChuaGiam - tongTienHang;
                var tongTienChiTieuX = pxgPrice(tongTienHang);
                console.log("================================");
                //console.log("%c" + PXGCert(tongTienHang), "font-size:26px;");
                console.log("%c(1)Số tiền bạn Tiêu vào Shopee là: " + "%c" + pxgPrice(tongTienHang) + " vnđ%c", "font-size: 20px;", "font-size: 26px; color:orange;font-weigth:700", "font-size: 20px;");
                console.log("================================");
                console.log("%c(2)Tổng đơn hàng đã giao: " + "%c" + pxgPrice(tongDonHang) + " đơn hàng", "font-size: 20px;", "font-size: 20px; color:green");
                console.log("%c(3)Số lượng sản phẩm đã đặt: " + "%c" + pxgPrice(tongSanPhamDaMua) + " sản phẩm", "font-size: 20px;", "font-size: 20px; color:#fc0000");
		console.log("%c(2)Tổng tiền hàng chưa áp mã: " + "%c" + pxgPrice(tongTienHangChuaGiam) + " đơn hàng", "font-size: 20px;", "font-size: 20px; color:green");
                console.log("%c(4)Tổng tiền TIẾT KIỆM được nhờ áp Mã giảm giá Shopee: " + "%c" + pxgPrice(tongTienTietKiem) + " vnđ", "font-size: 18px;", "font-size: 18px; color:green");
                console.log("%cTỔNG TIẾT KIỆM: " + "%c" + pxgPrice(tongTienTietKiem) + " vnđ", "font-size: 24px;", "font-size: 24px; color:orange;font-weigth:700");
                //console.log("%c💰NẾU MUA QAU RIOKUPON BẠN SẼ NHẬN HOÀN TIỀN ĐẾN: " + "%c" + pxgPrice(tongTienHoan) + " vnđ", "font-size: 24px;", "font-size: 24px; color:orange;font-weigth:700");
                console.log("================================");
                //console.log("%c👉Mua sắm nhận hoàn tiền đến 50% tại: " + "%chttps://riokupon.com", "font-size: 24px;", "font-size: 24px; color:orange;font-weigth:700");
            }
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = handleResponse;
    xhttp.open("GET", "https://shopee.vn/api/v4/order/get_order_list?list_type=3&offset=" + offset + "&limit=" + si, true);
    xhttp.send();
}

function PXGCert(pri) {
    //if (pri <= 10000000) {
    //    return "HÊN QUÁ! BẠN CHƯA BỊ SHOPEE GÂY NGHIỆN 😍";
    //} else if (pri > 10000000 && pri <= 50000000) {
    //    return "THÔI XONG! BẠN BẮT ĐẦU NGHIỆN SHOPEE RỒI 😂";
    //} else if (pri > 50000000 && pri < 80000000) {
    //    return "ỐI GIỜI ƠI! BẠN LÀ CON NGHIỆN SHOPEE CHÍNH HIỆU 😱";
    //} else {
    //    return "XÓA APP SHOPEE THÔI! BẠN NGHIỆN SHOPEE NẶNG QUÁ RỒI 😝";
    //}
    return "";
}

function pxgPrice(number, fixed = 0) {
    if (isNaN(number)) return 0;
    number = number.toFixed(fixed);
    let delimeter = '.';
    number += '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(number)) {
        number = number.replace(rgx, '$1' + delimeter + '$2');
    }
    return number + " đ";
}

xemBaoCaoThongKe();

        
