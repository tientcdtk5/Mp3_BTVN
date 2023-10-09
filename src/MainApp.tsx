import Sidebar from './component/Sidebar'
import Footer from './component/Footer'

import ImageAlbum from './component/ImageAlbum'
import ListAlbum from './component/ListAlbum'

import './index.css'

function MainApp() {

  return (
    <div className="main-app">
      <div className="main">
        <Sidebar/>
        <div className="main_music">
          <ImageAlbum/>
          <ListAlbum/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default MainApp
