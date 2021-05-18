import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'

const Layout = () => {
  return (
    <div style={{ display: "grid", gridTemplateAreas: '"header header header header header header" "nav main main main main main"' }}>
      <Sidebar />
      <Header username='djreggae' />
      <Main />
    </div>
  )
}

export default Layout