import * as Layout from '@/layouts';
import * as Environment from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Environment.SignIn />} />

      <Route element={<Layout.Default />}>
        <Route path="/" element={<Environment.Dashboard />} />

        <Route path="/certificate">
          <Route path="" element={<Navigate to="date" />} />

          <Route path="date" element={<Environment.DateStep />} />
          <Route path="employee" element={<Environment.EmployeeDataStep />} />
          <Route path="type" element={<Environment.TypeExamStep />} />
          <Route path="exam" element={<Environment.ExamStep />} />
        </Route>

        <Route path="/profile" element={<Layout.Profile />}>
          <Route path="" element={<Navigate to="user-data" />} />

          <Route path="user-data" element={<Environment.Personal />} />
          <Route path="security" element={<Environment.ResetPassword />} />
        </Route>
      </Route>
    </Routes>
  );
}
