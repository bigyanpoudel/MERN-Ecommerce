import bcryptjs from 'bcryptjs';
export const users = [
{
    name: "bigyan",
    email:"bgyan@gmail.com",
    password: bcryptjs.hashSync("123456",10),
    isAdmin: true

},
{
    name: "ram",
    email:"ram@gmail.com",
    password:bcryptjs.hashSync("123456",10),
},
{
    name: 'sita',
    email:'sita@gmail.com',
    password:bcryptjs.hashSync("123456",10),

}
]