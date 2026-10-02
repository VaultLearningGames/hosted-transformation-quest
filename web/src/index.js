import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import App from './App'
import './index.css'
import { setLogger, ReactOGDLogger } from './model/reactLogger'

setLogger(new ReactOGDLogger());
// REACT_APP_ROUTER=hash keeps the route in the URL's #fragment (…/index.html#/level/3), so the same build plays from
// any folder on a static host (the Vault CDN serves each branch, tag and release from its own path and has no
// server-side fallback to index.html). Other builds keep path routes under REACT_APP_SUBDIR.
const RouterComponent = process.env.REACT_APP_ROUTER === 'hash' ? HashRouter : BrowserRouter
ReactDOM.render(<App RouterComponent={RouterComponent} />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()