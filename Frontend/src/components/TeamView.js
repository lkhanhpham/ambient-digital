const TeamView = (props) => {
  return (
    <>
      <div className="team-card d-flex flex-column justify-content-center m-2">
        <div className="text-dark d-flex justify-content-center align-self-center pt-5 pb-3">
          <h3 className="big-title">{props.teamName}</h3>
        </div>
      </div>

      <style jsx="true">
        {`
          .team-card {
            width: 500px;
            height: auto;
            border-radius: 1rem;
            background-color: #ca6702;
          }
        `}
      </style>
    </>
  );
};

export default TeamView;
