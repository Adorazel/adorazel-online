import React from "react"
import {Redirect, Route} from "react-router-dom"

const SeoRedirects = () => {

  return (<>
    <Route exact path="/about-me/"><Redirect to="/about"/></Route>
    <Route exact path="/portfolio/shop-happy-ocean/"><Redirect to="/portfolio/5f5608a6dc3c51020bdd7abd"/></Route>
    <Route exact path="/portfolio/intergroup/"><Redirect to="/portfolio/5f560866dc3c51020bdd7aba"/></Route>
    <Route exact path="/portfolio/wizart/"><Redirect to="/portfolio/5f560796dc3c51020bdd7ab5"/></Route>
    <Route exact path="/portfolio/artisan/"><Redirect to="/portfolio/5f560761dc3c51020bdd7ab3"/></Route>
    <Route exact path="/portfolio/companion/"><Redirect to="/portfolio/5f560716dc3c51020bdd7ab1"/></Route>
    <Route exact path="/portfolio/delfin/"><Redirect to="/portfolio/5f5606b3dc3c51020bdd7aae"/></Route>
    <Route exact path="/portfolio/metronix/"><Redirect to="/portfolio/5f560656dc3c51020bdd7aac"/></Route>
    <Route exact path="/blog/24-metronix/"><Redirect to="/blog/5f5f0d15bb119908c9c72ddd"/></Route>

  </>)

}

export default SeoRedirects