import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setPostAuthPath} from './../redux/modules/authentication';

export default(ComposedComponent) => {
    class Authentication extends Component {
        static propTypes = {
            authenticated: PropTypes.bool,
            history: PropTypes.shape({push: PropTypes.func}),
            match: PropTypes.shape({path: PropTypes.string}),
            setPostAuthPath: PropTypes.func,
            getShips: PropTypes.func
        };

        // List of pre-authention routes, so they aren't saved for a post-auth redirect
        static preAuthRoutes = ['/', '/register', '/reset-password', '/forgot-password'];

        componentDidMount = () => this.ensureAuthentication(this.props.authenticated);

        componentWillUpdate = (nextProps) => {
            if (this.props.authenticated !== nextProps.authenticated) {
                this.ensureAuthentication(nextProps.authenticated);
            }
        };

        ensureAuthentication = (isAuthed) => {
            console.log(isAuthed)
            if (!isAuthed) {
                console.log('harus login')
                console.log(this.props.match)
                const path = _.get(this.props.match, 'path');
                
                if (path && !Authentication.preAuthRoutes.includes(path)) {
                    this
                        .props
                        .setPostAuthPath(path);
                }
                return window.location.href = "http://gurindam12.id/member/beranda";
                // return this
                //     .props
                //     .history
                //     .push('/');
            }
        }

        render() {
            console.log('render require auth')
            return <ComposedComponent { ...this.props }/>;
        }
    }

    const mapStateToProps = ({authentication}) => ({authenticated: authentication.authenticated});
    return withRouter(connect(mapStateToProps, {setPostAuthPath})(Authentication));
};
