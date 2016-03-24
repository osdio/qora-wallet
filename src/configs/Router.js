import React, {
    Navigator
} from 'react-native';
import _ from 'lodash';
import * as CustomSceneConfigs from './sceneConfig';
import connectComponent from '../utils/connectComponent';
import Layouts from '../layouts';

const {SceneConfigs} = Navigator;


const mapComponentNameToTitle = {
    EncryptWallet: 'Encrypt Wallet',
    Send: 'Send Qora',
    QRCode: 'Scan',
    RegisterName: 'Register Name',
    Request: 'Request Qora'
};


class Router {
    constructor(navigator) {
        this.navigator = navigator;
        Object.keys(Layouts).forEach(key=> {
            this[`to${key}`] = (props)=> {
                this.push(props, {
                    name: key,
                    component: Layouts[key],
                    center: mapComponentNameToTitle[key]
                })
            };
        });
    }


    push(props = {}, route) {
        let routesList = this.navigator.getCurrentRoutes();
        let nextIndex = routesList[routesList.length - 1].index + 1;
        route = {
            ...route,
            props,
            index: nextIndex,
            sceneConfig: route.sceneConfig ? route.sceneConfig : CustomSceneConfigs.customFloatFromRight,
            id: _.uniqueId(),
            component: connectComponent(route.component)
        };
        this.navigator.push(route);
    }


    pop() {
        this.navigator.pop();
    }


    resetToCreateWallet() {
        this.navigator.resetTo({
            name: 'CreateWallet',
            component: connectComponent(Layouts.CreateWallet),
            center: 'Create Wallet'
        })
    }


    resetToHome() {
        this.navigator.resetTo({
            name: 'Home',
            component: connectComponent(Layouts.Home),
            showNav: false
        })
    }
}


export default Router;
