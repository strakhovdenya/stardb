const compose = (...func) => (comp) => {
    return func.reduceRight((previousResult, f) => f(previousResult), comp);
}

export default compose;