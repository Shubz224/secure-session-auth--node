const sessionIdtousermap = new Map();

export function setUser(id,user){
    sessionIdtousermap.set(id,user);
}

export function getUser(id){

    return sessionIdtousermap.get(id);
}

