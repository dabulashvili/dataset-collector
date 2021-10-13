import React, { useContext } from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { UserProvider, UserContext } from './context/user-context'
import LogIn from './components/Login'
import TopBar from './components/TopBar'
import Record from './components/Record'
import RecordsList from './components/RecordList'
import SentenceList from './components/SentenceList'

import './App.css'

function App() {
    const PrivateRoute = ({ component: Component, ...rest }) => {

        const { state } = useContext(UserContext)
        return (
            <Route {...rest} render={(props) => (
                state.user
                    ? <TopBar {...props}>
                        <Component {...props}></Component>
                    </TopBar>
                    : <Redirect to='/login' />
            )} />
        )
    }

    return (
        <Router>
            <UserProvider>
                <Route path='/login' component={LogIn} />
                <SnackbarProvider autoHideDuration={1000}>
                    <PrivateRoute path='/' exact component={() => <Redirect to='/sentences' />} />
                    <PrivateRoute path='/sentences' exact component={SentenceList} />
                    <PrivateRoute path='/records' component={RecordsList} />
                    <PrivateRoute path='/record/:id?' component={Record} />
                </SnackbarProvider>
            </UserProvider>
        </Router>
    )
}

export default App
