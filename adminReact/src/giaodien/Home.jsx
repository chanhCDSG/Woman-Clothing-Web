
import React, { useState, useEffect } from "react";
import '../App.css'
import {AiFillCaretDown} from 'react-icons/ai'
import {BsFillCartFill} from 'react-icons/bs'
import {HiShoppingCart} from 'react-icons/hi'
import {BsFillAlarmFill} from 'react-icons/bs'
import {FaLock} from 'react-icons/fa'
import {AiOutlineComment} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import { Link } from "react-router-dom";
import {GiHamburgerMenu} from 'react-icons/gi';

import axios from 'axios';
export default function Home() {
  
  const [position, setPosition] = useState(0); 
  const [vaydamcs, setVaydamcs] = useState([]);
  const [sominu, setSominu] = useState([]);
  const [chanvay, setChanvay] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 

  const userData = localStorage.getItem('userData');
const user = userData ? JSON.parse(userData).user : null;
const userId = user ? user.id : null;


const handleLogout = ()=>{
 
  localStorage.removeItem('userData');
};

const [slsptgh,setslsptgh] = useState(0);
useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/users/${userId}/slsptgh`)
    .then((response) => {
      setslsptgh(response.data); 

    })
    .catch((error) => {
      console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
    });
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position) => {
        const newPosition = position + 0.25;
        if (newPosition > windowWidth) {
          setTimeout(() => {
            setPosition(0);
          }, 1000); // wait for 1 seond before resetting the position and starting over
        }
        return newPosition;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [windowWidth]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setPosition(0);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/index`)
      .then((response) => {
        console.log(response.data); // Kiểm tra có trả về dữ liệu hay không

        setVaydamcs(response.data.vaydamcs);
        setSominu(response.data.sominu);
        setChanvay(response.data.chanvay);
      })
      .catch((error) => {
        console.log(error); // Kiểm tra xem có lỗi xảy ra hay không
      });
  }, []);
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };  

  

  return (
    <div> 
      <div id="">
      <div id="menu">
      <button className="menu-toggle" onClick={toggleMenu}>
<GiHamburgerMenu style={{ fontSize: 22 }} />
      </button>
      <ul id="header" className={isMenuOpen ? 'menu-open' : ''}>
        <li>
          <Link to="/">Giới thiệu</Link>
        </li>
        <li id="down1">
          <Link to="/">Sản phẩm <AiFillCaretDown /></Link>
          <ul id="dc1" >
            <li><Link to="/category/sominu">Sơ mi nữ</Link></li>
            <li><Link to="/category/chanvay">Sơ mi nam</Link></li>
            <li><Link to="/category/vaydamcongso">Váy đầm công sở</Link></li>
          </ul>
        </li>
        <li><Link to="/">Góc cửa hàng</Link></li>
        <li id="down2">
          
          <Link to="/">Hot Deal <AiFillCaretDown /></Link>
          <ul id="dc2" >
            <li><Link to="/category/bosuutapmoi">Bộ sưu tập mới</Link></li>
            <li><Link to="/category/somichanvay">Quàn tây nam</Link></li>
            <li><Link to="/category/sandouudai">Săn đồ ưu đãi</Link></li>
            <li><Link to="/category/xahang">Xả hàng</Link></li>
          </ul>
        </li>
        <li><Link to="/">Tuyển dụng</Link></li>
        <li><Link to="/">Feedback</Link></li>
        <li><Link to="/">Liên hệ</Link></li>
        <li>
          <Link to="/Cart">Giỏ hàng <BsFillCartFill /></Link>
          <div className="cart-count">{slsptgh}</div>
        </li>
        <li>
          <Link to={"/Kiemtradon"}>kiểm tra đơn hàng</Link>
          </li>
        
      </ul>
    </div>

<div id="login-register">
      <ul>
        {user ? (
          <>
            <li>Xin chào: {user.name}</li>
            <li>
              <button onClick={handleLogout} style={{with: 150,height:42,fontSize:12,float:'left'}}>
                <Link to="/account/login">Đăng xuất</Link>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/account/login">Đăng nhập</Link>/
            </li>
            <li>
              <Link to="/account/register">Đăng ký</Link>
            </li>
          </>
        )}
      </ul>
    </div>


</div>

<div className="eqeqr">
          <img id="anhheader" className="img-fluid"  src="https://media.canifa.com/Simiconnector/BannerSlider/c/h/chaothu-top-banner-desktop_2880x960.webp" alt="Responsive image" />
   
          <div className="container">
  <div className="row">
    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="icon">
        <HiShoppingCart />
      </div>
      <div className="chi">
        <h3 className="mb-3">Miễn phí vận chuyển</h3>
        <p>Miễn phí vận chuyển toàn quốc với đơn hàng giá trị trên 599K</p>
      </div>
    </div>

    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="icon">
        <BsFillAlarmFill />
      </div>
      <div className="chi">
        <h3 className="mb-3">7 ngày đổi size đổi kiểu</h3>
<p>Áp dụng theo chính sách đổi trả hàng của thời trang Citi Mode</p>
      </div>
    </div>

    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="icon">
        <FaLock />
      </div>
      <div className="chi">
        <h3 className="mb-3">Thanh toán bảo mật</h3>
        <p>Citi Mode cam kết bảo mật 100% với thông tin thanh toán của khách hàng</p>
      </div>
    </div>

    <div className="col-sm-12 col-md-6 col-lg-3">
      <div className="icon">
        <AiOutlineComment />
      </div>
      <div className="chi">
        <h3 className="mb-3">Hỗ trợ 24/7</h3>
        <p>Bộ phận hỗ trợ thường trực giải đáp thắc mắc cho khách hàng</p>
      </div>
    </div>
  </div>
</div>


   <div className="nd2">
    <h3>Váy đầm công sở</h3>
   </div>


 <div className="vay">
  {
     vaydamcs.map(vdcs =>{
      return (
        <div className="vay1" key={vdcs.id}>
     <img className="img-fluid" src={`${process.env.REACT_APP_BASEURL}/upload/${vdcs.hinhanh}`} alt="" />

          <p className="ahoandz"><Link to={`/Detail/${vdcs.title}/${vdcs.id}`}>{vdcs.title}</Link></p><br></br><br></br><br></br>
      <p>{vdcs.gia}</p>
    
        </div>
      );
     })
  }
  

 
 </div>



 <div className="nd2">
    <h3>Sơ mi nữ</h3>
   </div>
 <div className="vay">
 {
     sominu.map(sominu =>{
      return (
        
        <div className="vay1" key={sominu.id}>
    <img className="img-fluid" src={`${process.env.REACT_APP_BASEURL}/upload/${sominu.hinhanh}`} alt="" />

          <p className="ahoandz"><Link to={`/Detail/${sominu.title}/${sominu.id}`}>{sominu.title}</Link></p><br></br><br></br><br></br>
       <h6>{sominu.gia}</h6>
        </div>
      
      );
     })
  }

  
 </div>



 <div className="nd2">
    <h3>So mi nam</h3>
   </div>
 <div className="vay">

  {
     chanvay.map(chanvay =>{
      return (
        <div className="vay1" key={chanvay.id}>
          <img className="img-fluid" src={`${process.env.REACT_APP_BASEURL}/upload/${chanvay.hinhanh}`} alt="" />
          <p className="ahoandz"><Link to={`/Detail/${chanvay.title}/${chanvay.id}`}>{chanvay.title}</Link></p><br></br><br></br><br></br>
          <h6>{chanvay.gia}</h6>
        </div>
      );
     })
  }

 
 </div><br></br>

 <div class="ykien">
  <h3>Khách hàng nói gì về chúng tôi</h3>
  <div class="container">
    <div class="blkh">
      <div class="hand">
        <img class="img-fluid" src="data:image/jpeg;base64,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" alt=""/>
        <p>Tiền nào của nấy, rất ngại mua đồ chợ, mua sản phẩm của Nhom 1 rồi thấy rất ưng và yên tâm!</p>
        <strong>Con Vẹt</strong>
      </div>
      <div class="hand">
<img class="img-fluid" src="https://th.bing.com/th?id=OIP.ibNBUEhxk47pnAnVQR8kfQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt=""/>
        <p>Nhóm 1 giao hàng rất nhanh mà đảm bảo. Hãng uy tín, mình mua nhiều lần rồi nên rất yên tâm chuyển khoản trước!</p>
        <strong>Con Bò</strong>
      </div>
      <div class="hand">
        <img class="img-fluid" src="https://th.bing.com/th?id=OIP.1WBL2sINUPqiI28GPuwoqQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt=""/>
        <p>Mặc đầm của Nhóm 1 rất hợp, có bộ sưu tập mới ra là lại sốt xình sịch!</p>
        <strong>Con Gà</strong>
      </div>
      <div class="hand">
        <img class="img-fluid" src="https://th.bing.com/th?id=OIP.kBDopfaSZRiafX9ERdgvHAHaG_&w=257&h=242&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt=""/>
        <p>Áo sơ mi nam bên Nhóm 1 thật là đẹp, chất vải không bị nhăn 10đ cho sản phẩm tốt</p>
        <strong>Con khỉ</strong>
      </div>
      <div class="hand">
        <img class="img-fluid"
src="data:image/jpeg;base64,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" alt=""/>
        <p>Mình đã mua và rất ưng với chất liệu ,kiểu dáng sản phẩm</p>
        <strong>Con chó </strong>
      </div>
    </div>
  </div>
</div>

<div className="thegioiphaidep">
  <div className="tgpd1">
  <span className='tgpd'>THẾ GIỚI CỦA PHÁI ĐẸP</span>
  <p className='eqeqr'>Tổng hợp những kiến thức về thời trang, làm đẹp và những sự kiện thời trang khác</p>
  </div>
<div className="tgpd2">
  <div className="slidechung">
  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/f4/26/6d/06/def0ccf4c96da793fe00085976c3dc5d3cbe366d7415d744d1266284.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/hrctddhmn"> HIỂU RÕ CƠ THỂ MÌNH ĐỂ ĐẸP HƠN MỖI NGÀY </Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Đừng mãi chỉ chạy theo xu hướng, hiểu rõ cơ thể mình mới là điều quan trọng nhất để mặc đẹp mỗi ngày. Hy vọng những chia sẻ của Citi Mode sẽ phần nàng tự tin hơn trong khoảng lựa chọn trang phục để luôn tỏa sáng nhất nàng nhé.</p>
     <h6><Link to="/hrctddhmn">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    </div>
  </div>
  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/5e/ab/18/df/6416d367b0945924e5f8bcd24547c2e73f41e87a225bf90955fed4da.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/nbvanvddx">  NỔI BẬT VÀ ẤN TƯỢNG VỚI ĐẦM DÁNG XÒE !!!</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Nếu những thiết kế đầm suông mang đến sự thoải mái, trẻ trung hay những kiểu dáng bodycon ấn tượng cho vẻ ngoài cuốn hút thì những thiết kế đầm xòe lại không làm cho các Quý cô thất vọng với sự nhẹ nhàng và vô cùng nữ tính.</p>

 <h6><Link to="/nbvanvddx">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    </div>
  </div>

  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/1a/4b/67/5e/514d87737939c2677f376420463b67867af83ce140ae07511969bcd5.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/cdcvbc">  10 cách diện chân váy bút chì thanh lịch</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Chân váy bút chì là 1 trong những item kinh điển của phụ nữ công sở. Item này vừa đơn giản, tôn dáng lại mang cảm giác thanh lịch, chỉn chu cho người mặc. Phụ nữ Hàn cũng thường xuyên chọn diện chân váy bút chì khi đến sở làm. Thậm chí, họ còn biến tấu, mix&match chân váy bút chì với nhiều item khác biệt để có được những bộ cánh mới mẻ mỗi ngày.</p>

 <h6><Link to="/cdcvbc">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    </div>
  </div>

  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
<img src="https://statics.pancake.vn/web-media/b0/37/62/c3/86831d6accfa0b3b96e0715a687b007403ae0f550d617e91b26cb288.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/sdttt">  SẮC ĐỎ TRONG THỜI TRANG</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Kể từ thời cổ đại, màu đỏ đại diện cho cuộc sống sung túc, cho nguồn sức mạnh dồi dào và niềm đam mê cháy bỏng. Trong thời trang, không ít những món đồ màu đỏ đã trở thành biểu tượng thương hiệu riêng cũng như đại diện thương hiệu chung. Trang phục màu đỏ có sức mê hoặc khó cưỡng, tạo hiệu ứng thị giác mạnh mẽ, là cách các nàng thể hiện bản lĩnh tự tin và khả năng làm chủ tình huống.</p>
 <h6><Link to="/sdttt">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    </div>
  </div>
  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/51/02/84/b0/b674ce1842630a4d6da83c96fa6397a4dcb6b39f50658312d66aa088.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/cctpsm"> Các công thức phối sơ mi + chân váy cả tuần cho nàng công sở</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Trong trường hợp quá lười chọn đồ hoặc bí ý tưởng, nàng cứ diện một set đồ an toàn mà chuẩn nhất cho chốn công sở, chính là nguyên set đồ vest. Áo vest đi cùng chân váy luôn là outfit đạt điểm 10 về độ lịch sự, mang đậm hơi thở quý cô công sở và gần như không có điểm trừ. Outfit này chỉ có đôi chút bất tiện nếu diện trong thời tiết nóng bức. Bởi vì thế nàng hãy ưu tiên chọn set đồ này cho những ngày khí hậu mát mẻ, đặc biệt trong những ngày có sự kiện quan trọng như họp hành, gặp mặt khách hàng để đảm bảo nét thanh lịch, kín đáo cho chính mình nàng nha!</p>
 <h6><Link to="/cctpsm">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    </div>
  </div>
  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/15/63/2d/28/3a1a46e4647e452146fa35e04913214f6f53efc6e382b9958d9f96db.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/dlmj"> ĐI LÀM MẶC GÌ?</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Thời trang không chỉ là lĩnh vực liên quan đến phạm trù thẩm mỹ mà ở trong đó còn ẩn chứa những bí mật hết sức thú vị. Có thể nàng chưa biết, mỗi màu sắc trong thời trang đều nói lên một tính cách ẩn sâu trong con người nàng. Và dưới đây là ý nghĩa màu sắc thời trang và cách phối màu quần áo phù hợp cho mỗi ngày đi làm nàng nha!</p>
<h6><Link to="/dlmj">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    
    </div>
  </div>






  <div className="slidecc">
    <div className="slidefake" style={{ transform: `translateX(${-position}px)` }}>
     <img src="https://statics.pancake.vn/web-media/9c/f3/f1/c4/78ce99cfcdcb73ec53861b00181ab03cc792fe0d34cd255b48067862.png" alt="" /><br></br>
     <p style={{background:'brown'}}>23 Tháng 8 2022</p>
     <h5><Link to="/vdcscc">VÁY ĐẦM CÔNG SỞ CAO CẤP: CỰC SANG TRỌNG VÀ TINH TẾ</Link> </h5>
     <BsFillPersonFill/> Thời trang hot
     <p className='yasuo'>Không xa hoa lộng lẫy, không cần quá nổi bật giữa đám đông, những mẫu đầm hàng hiệu luôn sở hữu vẻ đẹp lung linh đến diệu kỳ, khiến chị em không thể nào rời mắt. </p>
      <h6><Link to="/vdcscc">  Đọc tiếp <AiOutlineArrowRight/></Link></h6> 
    
    </div>
  </div>

  
</div>
</div>
</div>

    </div>

<div style={{marginTop: '20px',borderRadius:'15px',background:'#cc9c69'}}>
        <div class="container-fluid fh5co_footer_bg pb-3">
    <div class="container animate-box">
        <div class="row">
        
            <div class="col-12 col-md-4 col-lg-3">
                <div class="footer_main_title py-3"> Địa chỉ tòa soạn</div>
                <div class="footer_sub_about pb-3"> Lô 14, Đường số 5, Công viên Phần Mềm Quang Trung, Phường Tân Chánh Hiệp, Quận 12, TP.HCM
Điện thoại: 012.3456.789 - Fax: 029.9999.999
Đường dây nóng: 0999.9999.99
Email: nhom1@gmail.com
                </div>
                <div class="footer_mediya_icon">
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-linkedin"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-google-plus"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-twitter"></i></div>
                    </a></div>
                    <div class="text-center d-inline-block"><a class="fh5co_display_table_footer">
                        <div class="fh5co_verticle_middle"><i class="fa fa-facebook"></i></div>
                    </a></div>
                </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2">
                <div class="footer_main_title py-3"> Category</div>
                <ul class="footer_menu">
                    <li><a href="{{url('/kinhdoanh')}}"><i class="fa fa-angle-right"></i> kinh doanh</a></li>
                    <li><a href="{{url('/khoahoc')}}"><i class="fa fa-angle-right"></i> khoa học</a></li>
                    <li><a href="{{url('/thoitrang')}}"><i class="fa fa-angle-right"></i> Thời trang</a></li>
                    <li><a href="{{url('/giaoduc')}}"><i class="fa fa-angle-right"></i> Giáo dục 4.0</a></li>
                    <li><a href="{{url('/giaothong')}}"><i class="fa fa-angle-right"></i> Giao thông</a></li>
                    <li><a href="{{url('/laodongvieclam')}}"><i class="fa fa-angle-right"></i> Lao động việc làm</a></li>
                    <li><a href="{{url('/thegioitunhien')}}"><i class="fa fa-angle-right"></i> Thế giới tự nhiên</a></li>
                    <li><a href="{{url('/cacmonthethaokhac')}}"><i class="fa fa-angle-right"></i> Các môn thể thao khác</a></li>
                </ul>
        
                
            </div>
            <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                <div class="footer_main_title py-3"> Liên Hệ Quảng Cáo: ADMICRO</div>
                <div class="footer_makes_sub_font">Hotline: 099.99.99.99 - 099.88.88.88
                    Email: nhom1@admin.com</div>
                Add: Lô 14, Đường số 5, Công viên Phần Mềm Quang Trung, Phường Tân Chánh Hiệp, Quận 12, TP.HCM
                
            </div>
            <div class="col-12 col-md-5 col-lg-3 position_footer_relative">
                <div class="footer_main_title py-3"> CHUYÊN TRANG GIA ĐÌNH VÀ XÃ HỘI - BÁO ĐIỆN TỬ SỨC KHỎE VÀ ĐỜI SỐNG</div>
                <div class="footer_makes_sub_font">Cơ quan chủ quản: Bộ Y tế
Tổng biên tập: Nhóm 1</div>
            

Cơ quan chủ quản: Bộ Y tế
Tổng biên tập:Nhóm 1
Hoạt động theo Giấy phép số 60/GP-CBC ngày 23/7/2021 của Cục Báo chí - Bộ Thông tin và Truyền thông
® Mọi hình thức sao chép thông tin, hình ảnh phải có sự đồng ý bằng văn bản. Vui lòng dẫn <a href="https://giadinh.suckhoedoisong.vn/">giadinh.suckhoedoisong.vn</a> khi phát hành lại thông tin từ website này.
                
            </div>
            
        </div>
        <div class="row justify-content-center pt-2 pb-4">
            <div class="col-12 col-md-8 col-lg-7 ">
                <div class="input-group">
                <span class="input-group-addon fh5co_footer_text_box" id="basic-addon1"><i class="fa fa-envelope">Nhom1@gmail.com</i></span>
                 
                 
                </div>
            </div>
        </div>
    </div>
</div>
    </div>

</div>
  )
}