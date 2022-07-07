import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Auth/Dashboard/Dashboard";
import ClassBoard from "./components/Class/ClassBoard/ClassBoard";
import TestReview from "./components/Class/ClassBoard/Test/TestReview/TestReview";

import SignUp from "./components/Auth/Sign Up/SignUp";
import SignIn from "./components/Auth/Sign In/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-up/" element={<SignUp />} />
      <Route path="/sign-in/" element={<SignIn />} />

      <Route path="/class/:id" element={<ClassBoard />} />
      <Route path="/test-review/:test_id" element={<TestReview />} />
    </Routes>
  );
}

export default App;
