import './app.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'
import React, {useEffect} from 'react'
import Topbar from "./components/topbar/Topbar";
import MainRouter from "./MainRouter";

function App() {
    useEffect(() => {
        AOS.init({duration: 1500})
    })

    return (
        <div className="App">
            <header>
                <Topbar/>
            </header>
            <main>
                <MainRouter/>
            </main>
        </div>
    );
}


export default App;
