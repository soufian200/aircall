import React from 'react';
import { tabsTitles } from '../services/config';


const Tab = ({ tab, isActive, setCrrPage }) => {

    return <button onClick={() => setCrrPage(tab)} className={`tab-link ${isActive ? "active" : ''}`} >{tab}</button>
}


const Tabs = ({ setCrrPage, crrPage }) => {

    const TABS = [tabsTitles.feed, tabsTitles.archived]

    return <div id="tabs-container">
        {
            TABS.map((tab, index) => <Tab key={index} tab={tab} isActive={crrPage === tab} setCrrPage={setCrrPage} />)
        }
    </div>
}

export default Tabs;