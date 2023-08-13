const Person = ({ id, name, number, handleClickRemove }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button
          onClick={() => {
            handleClickRemove(id);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default Person;
