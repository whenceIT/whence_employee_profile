'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card } from './ui/card'

export default function EmployeeProfileClient({ id }) {
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://lms2backend.whencefinancesystem.com/employee-profile/${id}`
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setEmployee(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load employee profile')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-slate-600">Loading employee profile...</p>
        </div>
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <p className="text-red-600 font-semibold">Error</p>
          <p className="text-slate-600 mt-2 text-sm">{error || 'Failed to load employee profile'}</p>
        </Card>
      </div>
    )
  }

  const placeholderImage =
    employee.gender?.toLowerCase() === 'male'
      ? '/placeholder-male.jpg'
      : '/placeholder-female.jpg'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Company Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-20 h-20 mb-3">
            <Image
              src="/company-logo.png"
              alt="Company Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Whence Financial Services</h2>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden shadow-lg">
          {/* Employee Image */}
          <div className="relative w-full h-80 bg-slate-200">
            <Image
              src={placeholderImage}
              alt={`${employee.firstName} ${employee.lastName}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Employee Information */}
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                {employee.firstName} {employee.lastName}
              </h1>
            </div>

            <div className="space-y-4">
              {/* Branch */}
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm font-medium text-slate-600 mb-1">Branch</p>
                <p className="text-lg text-slate-900">{employee.branch}</p>
              </div>

              {/* Contact Number */}
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Contact Number</p>
                <p className="text-lg text-slate-900">{employee.phone}</p>
                <p className="text-lg text-slate-900">0974941112</p>
              </div>


  {/* NRC*/}
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">NRC</p>
                <p className="text-lg text-slate-900">{employee.nrc}</p>
              </div>


            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}