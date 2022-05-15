const generateUsers = (_users, _books) => {

    const user = {}

    for(let i = 0; i <= _users; i++) {

        user[`P${i}`] = {};
        for(let x = 1; x <= _books; x++){
            if(Math.random() < 0.5)
                user[`P${i}`][`L${x}`] = 6 * Math.random() | 0
        }

    }

    return user
    
}

const algo_sim = (user1, user2, _users) => {
    const commun = Object.keys(_users[user1]).filter(k => _users[user2].hasOwnProperty(k))
    if(commun.length === 0) return 0
    const carres = commun.reduce((a, v) => a + (_users[user1][v] - _users[user2][v]) ** 2,  0) 
    return 1 / (1 + Math.sqrt(carres))
}

const recommanded_users = (_user, _users, func = algo_sim) => {
    return Object.keys(_users).map(user => user != _user ? [user, func(_user, user, _users)] : [user, -1] )
    .sort((a, b) => b[1] - a[1])
    .slice(0, -1)
    .join("\n")
}


const users = generateUsers(10, 5);

console.log(recommanded_users("P0", users))
