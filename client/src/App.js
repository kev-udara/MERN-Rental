import './App.css';
import  {Route, BrowserRouter, Redirect,Switch}  from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RentingCar from './pages/RentingCar'
import 'antd/dist/antd.min.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import ScrollToTop from 'react-router-scroll-top'
import AdminBookings from './pages/AdminBookings';
import Accessory from './pages/Accessory';
import Fleet from './pages/Fleet';
import FAQ from './pages/FAQ';
import RentingAccessory from './pages/RentingAccessory';
import AccessoryBookings from './pages/AccessoryBookings';
import AdminAccessoryBookings from './pages/AdminAccessoryBookings';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AdminAccessoryHome from './pages/AdminAccessoryHome';
import AddAccessory from './pages/AddAccessory';
import EditAccessory from './pages/EditAccessory';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import ProvideCoupon from './pages/ProvideCoupon';
import PaymentsPage from './pages/PaymentsPage';
import Report from './pages/Report';
import UserReportList from './pages/UserReportList';
import AdminReportList from './pages/AdminReportList';
import ContactUs from './pages/ContactUs';
import AdminRequestList from './pages/AdminRequestList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="morphfade"
                >
                  <Switch location={location}>
                    <ProtectedRoute path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    <Route path="/reset-password/:resetToken" exact component={ResetPassword} />
                    <Route path="/register" exact component={Register} />
                    <ProtectedRoute
                      path="/renting/:carid"
                      exact
                      component={RentingCar}
                    />
                    <ProtectedRoute
                      path="/userbookings"
                      exact
                      component={UserBookings}
                    />
                    <ProtectedRoute
                      path="/accessorybookings"
                      exact
                      component={AccessoryBookings}
                    />
                    <ProtectedRoute path="/addcar" exact component={AddCar} />
                    <ProtectedRoute
                      path="/editcar/:carid"
                      exact
                      component={EditCar}
                    />
                    <ProtectedRoute path="/admin" exact component={AdminHome} />
                    <ProtectedRoute
                      path="/adminbookings"
                      exact
                      component={AdminBookings}
                    />
                    <ProtectedRoute
                      path="/adminaccessorybookings"
                      exact
                      component={AdminAccessoryBookings}
                    />
                    <ProtectedRoute
                      path="/providecoupon"
                      exact
                      component={ProvideCoupon}
                    />
                    <ProtectedRoute path="/accessory" exact component={Accessory} />
                    <ProtectedRoute
                      path="/rentingaccessory/:accessoryid"
                      exact
                      component={RentingAccessory}
                    />
                    <ProtectedRoute path="/fleet" exact component={Fleet} />
                    <ProtectedRoute path="/faq" exact component={FAQ} />
                    <ProtectedRoute path="/adminaccessory" exact component={AdminAccessoryHome} />
                    <ProtectedRoute path="/payments" exact component={PaymentsPage}/>
                    <ProtectedRoute path="/report" exact component={Report}/>
                    <ProtectedRoute path="/contactus" exact component={ContactUs}/>
                    <ProtectedRoute path="/userreportlist" exact component={UserReportList}/>
                    <ProtectedRoute
                      path="/adminreports"
                      exact
                      component={AdminReportList}
                    />
                    <ProtectedRoute
                      path="/adminrequests"
                      exact
                      component={AdminRequestList}
                    />
                    <ProtectedRoute path="/addaccessory" exact component={AddAccessory} />
                    <ProtectedRoute
                      path="/editaccessory/:accessoryid"
                      exact
                      component={EditAccessory}
                    />
                    <Redirect to="/" />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
}



export default App;

export function ProtectedRoute(props)
{


    if(localStorage.getItem('user'))
    {
      return <Route {...props}/>
    }
    if(localStorage.getItem('admin'))
    {
      return <Route {...props}/>
    }
    else{
      return <Redirect to='/login'/>
    }


}




