// app/[id]/page.js
import EmployeeProfileClient from "../components/employeeprofile"

export default async function Page(props) {
  // Unwrap the params using await
  const { id } = await props.params
  function getNumberAfterDash(str) {
  return str.split('-').pop();
}

  // Pass ID to the client component
  return <EmployeeProfileClient id={getNumberAfterDash(id)} />
}