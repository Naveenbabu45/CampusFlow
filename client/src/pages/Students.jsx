

function Students() {
  return (
    <div className="students">
      <h1>Registered Students</h1>

      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>22A91A05XX</td>
            <td>Naveen</td>
            <td>CSE</td>
            <td>naveen@gmail.com</td>
          </tr>

          <tr>
            <td>22A91A0501</td>
            <td>Rahul</td>
            <td>CSE</td>
            <td>rahul@gmail.com</td>
          </tr>

          <tr>
            <td>22A91A0502</td>
            <td>Priya</td>
            <td>ECE</td>
            <td>priya@gmail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Students;