import React from 'react'

const withChildFunction = (child) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {child}
            </Wrapped>
        )
    }
}

export default withChildFunction;
