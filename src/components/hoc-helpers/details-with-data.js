import React, {Component} from 'react';

import Spinner from '../spinner';
import ErrorIndicator from "../error-indicator";


const detailsWithData = (View) => {

    return class extends Component {
        state = {
            item: null,
            image: null,
            itemUpdated: false,
            error: false
        }

        componentDidMount() {
            this.updateItem();
        }

        componentDidUpdate(prevProps) {
            if (this.props.itemId !== prevProps.itemId || this.props.getData!==prevProps.getData) {
                this.setState({itemUpdated: false});
                this.updateItem();
            }
        }

        updateItem() {
            const {itemId} = this.props;
            if (!itemId) {
                return;
            }

            this.props.getData(itemId)
                .then((item) => {
                    this.setState({
                        item: item,
                        itemUpdated: true,
                        error: false
                    })
                })
                . catch(() => {
                this.setState({
                    itemUpdated: true,
                    error: true
                });
            });
        }

        render() {
            const { item, error} = this.state;
            const { itemId} = this.props;
            if (!itemId) {
                return <span>Select a item from a list</span>;
            }

            if (error) {
                return <ErrorIndicator/>;
            }

            if (!this.state.itemUpdated) {
                return (
                    <div className="item-details card">
                        <Spinner/>
                    </div>
                );
            }

            const imageUrl = this.props.getImageUrl(item)

            return <View {...this.props} item={item} image={imageUrl}/>;
        }
    };
};

export default detailsWithData;
