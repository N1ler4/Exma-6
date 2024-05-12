import { users } from "../../service/users";

export const deleteUser = async (UserId: string) => {
  try {
    const res = await users.usersDelete(UserId);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (usersId: any, usersName: any, email: any, gender: any, Surname: any, Password: any, userAge: any , phoneNuber:any) => {
  try {
    const res = await users.usersUpdate({
      id: usersId,
      first_name: usersName,
      email: email,
      gender: gender,
      last_name: Surname,
      password: Password,
      age: userAge,
      phone_number: phoneNuber
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

