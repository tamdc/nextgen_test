const fakeAuth = ({email, password}) => {
    return new Promise((rs) => {
        setTimeout(() => rs(email), 250)
    })
}

export { fakeAuth }