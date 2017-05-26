'use strict';

import React,{Component} from 'react';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WwmTabBar from '../components/wwmtabbar';
import NewContact from '../components/newcontact';
import Contacts from '../components/contacts';
import EditContact from '../components/editcontact';
import IdentifyContact from '../components/identifycontact';
import IdentifyContacts from '../components/identifycontacts';
import Setting from '../components/setting';

class WwmContactsApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['所有联系人','新建联系人', '识别个人','识别多人', '设置'],
            tabIconNames: ['ios-book','ios-camera',  'ios-eye','ios-glasses', 'ios-hammer'],
        };
    }
    render() {
        const {tabNames,tabIconNames} = this.state;
        const {pageidx}=this.props;
        let contacts=<Contacts tabLabel='a0' />;
        if(pageidx==1){
            //alert("111");
            contacts=<EditContact tabLabel='a0' />;
        }

        return (
            <ScrollableTabView
                renderTabBar={() => <WwmTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition='bottom'>
                {contacts}
                <NewContact tabLabel='a1' />
                <IdentifyContact tabLabel="a2"/>
                <IdentifyContacts tabLabel="a3"/>
                <Setting tabLabel='a4' />
            </ScrollableTabView>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        pageidx: state.s_contacts.pageidx
    }
};

export default connect(mapStateToProps,null)(WwmContactsApp);
