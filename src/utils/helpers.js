export const formatPrice = (price) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: 'currency', 
        currency: 'USD'
    }).format(price / 100)
    return newNumber
}

export const getUniqueValues = (data, type) => {
    let newData = data.map(product => product[type])
    if (type === 'colors') {
    newData = newData.flat() 
    }
    return ['all', ... new Set(newData)]
}
