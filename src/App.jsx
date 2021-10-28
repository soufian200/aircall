import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/ActivityFeed.jsx';

import Tabs from './components/Tabs.jsx';
import AppContext from './contexts/AppContext.jsx';
import Header from './Header.jsx';
import { baseURL, tabsTitles } from './services/config.js';
import Archived from './components/Archived.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';


/**
 * set axios default baseUrl 
 * */
axios.defaults.baseURL = baseURL



const App = () => {



  /**
   * feed => Activity feed
   * detail => Activity Detail
   * archive => Archived Activities
   * */

  const [crrPage, setCrrPage] = useState(tabsTitles.feed) // feed | detail | achrive
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [callId, setCallId] = useState(null)
  const [archived, setArchived] = useState([])
  const [unarchived, setUnarchived] = useState([])



  useEffect(() => {

    // show loader
    setLoading(true)

    // get all activities
    axios.get('/activities').then(({ data }) => {

      // update activities
      setActivities(data)

      // hide loader
      setLoading(false)

    });

  }, [])


  useEffect(() => {

    const archivedActivities = activities.filter((activity => !activity.is_archived && activity))
    const unarchivedActivities = activities.filter((activity => activity.is_archived && activity))

    setArchived(archivedActivities)
    setUnarchived(unarchivedActivities)

    // console.log(activities.length)

  }, [activities])





  return (
    <AppContext.Provider value={{ activities, setActivities, crrPage, loading, setCrrPage, setCallId }}>

      <div className='container'>
        <Header />
        <div className="container-view">
          <Tabs setCrrPage={setCrrPage} crrPage={crrPage} />
          <div className="content">
            {crrPage === tabsTitles.feed && <ActivityFeed activities={archived} />}

            {crrPage === tabsTitles.archived && <Archived archivedActivities={unarchived} />}
            {crrPage === tabsTitles.detail && <ActivityDetail callId={callId} />}

          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
