const { use } = require("./router");

const Users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowercase();
    room = room.trim().toLowercase();

    const existingUser = Users.find( user => user.name === name && user.room === room);

    if (existingUser) return {error: 'username is already taken'};

    const user = {id, name, room};
    Users.push(user);
};

const removeUser = ({id}) => {
    const index = Users.findIndex( user => user.id === id);
    if (index !== -1) return Users.slice(index, 1)[0];
};

const getUser = ({id}) => Users.find( user => user.id === id);

const getUserRoom = ({room}) => Users.filter( user => user.room === room);

module.exports = {addUser, removeUser, getUser, getUserRoom};