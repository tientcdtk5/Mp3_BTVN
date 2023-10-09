import {  useSelector } from "react-redux/es/hooks/useSelector"
import { RootState } from "../features/store"

export default function ImageAlbum() {
    const {currentSong} = useSelector((state:RootState) => state.player)
    return (
        <div className="avatar-music">
            <img src={currentSong.image} alt="album" />
            <div className="name_album">DSK-Da Sun Kid(Đứa con của mặt trời)  </div>
            <div className="brand_album">King Of Rap</div>
            <div className="wish_count">80000 lượt yêu thích</div>
            <div className="lyrics">"Một khi đã là đam mê thì là cả đời, không phải là một giai đoạn hay chỉ là sự thích thú nhất thời. Tôi đơn giản rất yêu rap, như là cách để mình kể những câu chuyện riêng của mình. Tôi cảm thấy quan trọng nhất là cái sự thật trong từng câu hát",</div>
        </div>
    )
}