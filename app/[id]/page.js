// app/[id]/page.js
import EmployeeProfileClient from "../components/employeeprofile"

export default async function Page(props) {
  // Unwrap the params using await
  const { id } = await props.params

  // Pass ID to the client component
  return <EmployeeProfileClient id={id} />
}