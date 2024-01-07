import useUserInfo from "../../Hook/useUserInfo";

const Profile = () => {
const {userInfo} = useUserInfo()
console.log(userInfo);
    return (
        <div>
            adfad
            {userInfo.userName}
        </div>
    );
};

export default Profile;