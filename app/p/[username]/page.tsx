const UserProfile = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      <p>Hola, {params.username}</p>
    </div>
  );
};

export default UserProfile;
