import Nullable from "../types/Nullable";
import { User } from "../types/User";

export default function username(user: Nullable<User>){
	return (user && [ user.name, user.surname ]
		.filter(s => !!s)
		.join(" ")
	) || 'unnamed';
}