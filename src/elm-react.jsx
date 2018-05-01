import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

class Elm extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.convertState = this.props.convertState || (state => state);
    }

    componentDidMount() {
        this.app = this.props.src.embed(this.node, this.convertState(this.props.state));

        // Redux dispatch port
        this.app.ports.dispatch.subscribe(({ actions, payload }) => {

            // action をネストする関数
            //   wrapAction('getBank', 'generateReceiveBank');
            //     =>
            //   action.generateReceiveBank(action.getBank());
            const wrapAction = ([head, ...rest]) => {
                if (rest.length > 0) {
                    return this.props.actions[head](wrapAction(rest));
                }
                return this.props.actions[head](...payload);
            };

            this.props.dispatch(wrapAction(actions));
        });

        // 汎用的JS port
        this.app.ports.jsAction.subscribe(({ object, method, payload }) => {
            global[object][method](...payload);
        });

    }

    // Redux から nextProps を受け取って、Elm の port に渡し、render を防ぐ
    shouldComponentUpdate(nextProps) {
        this.app.ports.stateChange.send(this.convertState(nextProps.state));
        return false;
    }

    storeNode(node) {
        this.node = node;
    }

    render() {
        return <div ref={this.storeNode} />;
    }
}

const converter = oldkey => newkey => object =>
    Object.entries(object).reduce((obj, [key, val]) => ({
        ...obj,
        [key.replace(oldkey, newkey)] : val
    }), {});

const ElmConnected = connect((state, store) => ({
    state,
    store,
}))(Elm);

export default ElmConnected;
export { converter };

