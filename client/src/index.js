import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignUp from './hooks/SignUp';
import reducer from './store/reducers/reducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SignIn from './hooks/SignIn';
import Dashboard from './hooks/Dashboard';
import ProtectedRoute from './hooks/layout/ProtectedRoute';
import BaseLayout from './hooks/layout/BaseLayout';
import CreateClass from './hooks/CreateClass';
import CreateLesson from './hooks/CreateLesson';
import ViewClass from './hooks/ViewClass';
import Signout from './hooks/Signout';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jwt')
if (token) {
  store.dispatch({ type: 'ON_LOGIN', payload: token })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/' element={<SignIn />} />
            <Route path='/dashboard/:userId' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='/dashboard' element={<ProtectedRoute></ProtectedRoute>} />
            <Route path='/class/:className/:classId' element={<ProtectedRoute><ViewClass /></ProtectedRoute>} />
            <Route path='/signout' element={<ProtectedRoute><Signout /></ProtectedRoute>} />
          </Routes>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
