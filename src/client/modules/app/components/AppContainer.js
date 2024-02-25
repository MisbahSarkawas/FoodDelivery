import { connect } from 'react-redux';
import App from './App';
import { initAppComp, setURLHashData } from './../actions/AppActions';

const mapStateToProps = state => {
    const { appData } = state.app;

    return {
        appData
    };
}  

const mapDispatchToProps = dispatch => {
    return {
        initAppComp: () => {
            dispatch( initAppComp() )
        },
        setURLHashData: urlHash => {
            dispatch( setURLHashData(urlHash) )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)